const path = require('path');
const fs = require('fs');
const { createAndTrainModel, saveModel, loadModel } = require('../models/modelKNNClassifier.js');
const tf = require('@tensorflow/tfjs-node');
const admin = require('firebase-admin');
const {db, dbRealtime} = require('../firebase.js');
const fastcsv = require('fast-csv');

// Đường dẫn tới file CSV và file lưu trữ model
const csvFilePath = path.resolve(__dirname, '../../machine_learning/data_updated.csv');
const modelFilePath = path.resolve(__dirname, '../../machine_learning/knnModel.json');

// Khởi tạo Firebase Admin SDK
const statusRef = dbRealtime.ref('Home/status');
const sensorRef = dbRealtime.ref('Home/sensor');
const automationRef = dbRealtime.ref('Home/automation');
const k=21;

const  getChuoiCon = (str, i) => {
    while(i--){
        const indexHash = str.indexOf('|');
        if (indexHash === -1) {
            return str; // Nếu không có ký tự |, trả về toàn bộ chuỗi
        } else {
            str =  str.slice(indexHash+1); 
        }
    }
    const indexHash = str.indexOf('|');
    return str.slice(0, indexHash);
}

const replaceAt = (str, index, replacement) => {
return str.substring(0, index) + replacement + str.substring(index + 1);
}
// Hàm dự đoán
const predict = async (req, res) => {
  const snapshot = await automationRef.once('value');
  if(snapshot.val()){
    try {
      let classifier;
      const { readings } = req.body;
      const time = Date.now();
      const humi = getChuoiCon(readings, 0) ;
      const temp = getChuoiCon(readings, 1) ;
      const dataArray = [time, parseFloat(temp), parseFloat(humi)];
      console.log("input:", dataArray);
      // Kiểm tra nếu file model đã tồn tại
      if (fs.existsSync(modelFilePath)) {
        // Tải model từ file
        classifier = await loadModel(modelFilePath);
        console.log('Model đã được tải lại từ file.');
      } else {
        // Tạo và huấn luyện model nếu chưa tồn tại
        classifier = await createAndTrainModel(csvFilePath);
        // Lưu model vào file
        await saveModel(classifier, modelFilePath);
        console.log('Model đã được tạo và lưu vào file.');
      }


      // Chuyển đổi dataArray thành tensor 1 chiều
      const testTensor = tf.tensor1d(dataArray);

      // Dự đoán nhãn cho dữ liệu đầu vào
      // k = 21 la sieu tham so phu hop nhat
      const prediction = await classifier.predictClass(testTensor, 21);

      // Trả kết quả dự đoán
      const result =  prediction.label;//ex: "0,1"
      console.log("predict:", result);

      // Lấy dữ liệu từ Realtime Database
      statusRef.once('value', (snapshot) => {
          let status = snapshot.val();
          
          // Sửa đổi status dựa trên kết quả dự đoán
          status = replaceAt(status, 0, result[0]); // Đảm bảo status và label là chuỗi hợp lệ
          status = replaceAt(status, 2, result[2]); // Đảm bảo status và label là chuỗi hợp lệ
      
          // Cập nhật lại dữ liệu vào Realtime Database
          statusRef.set(status)
          .then(() => {
              console.log('Cập nhật trạng thái thành công');
          })
          .catch((error) => {
              console.error('Lỗi khi cập nhật trạng thái:', error);
          });
      });
  
      res.json(result);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Đã có lỗi xảy ra trong quá trình dự đoán.' });
    }
  }
  else {
    res.json({info: 'Chế độ Automation đang tắt'});
  }
};

// Hàm cập nhật mô hình
const updateModel = async (req, res) => {
  try {
    // Truy vấn các document từ collection Data
  /*  const collectionRef = db.collection('Data');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      res.status(404).json({ error: 'No documents found in the collection.' });
      return;
    }

    // Chuyển đổi các document thành định dạng CSV
    const csvStream = fastcsv.format({ headers: true });
    const writableStream = fs.createWriteStream(csvFilePath);

    writableStream.on('finish', async () => {
      console.log('CSV file created/Updated successfully');*/

      // Tạo và huấn luyện model từ file CSV
      const classifier = await createAndTrainModel(csvFilePath);

      // Lưu model vào file
      await saveModel(classifier, modelFilePath);
      console.log('Model đã được cập nhật và lưu vào file.');
      res.json({ message: 'Model đã được cập nhật thành công.' });
   // });

    /*csvStream.pipe(writableStream);
    snapshot.forEach(doc => {
      const data = doc.data();
      csvStream.write({
        time: data.time,
        temp: data.temp,
        humi: data.humi,
        Led: data.Led,
        Fan: data.Fan
      });
    });

    csvStream.end();*/

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã có lỗi xảy ra trong quá trình cập nhật model.' });
  }
};


const updateFireStore = async (req, res) => {
  try {
    const snapshot1 = await statusRef.once('value');
    const status = snapshot1.val();//ex '0|0|0|0#'
    const snapshot2 = await sensorRef.once('value');
    const sensor = snapshot2.val();//ex '70|30|1000|0|0#'
    // Lấy thời gian hiện tại
    const currentTime = new Date();
    // Định dạng thời gian hiện tại thành "dd-MM-yyyy HH:mm"
    const formattedTime = `${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}`;
    // Thêm dữ liệu mới vào Firestore
    await db.collection('Data').add({
      Fan: status[2],//Living Room
      Led: status[0],//Living Room
      humi: parseFloat(getChuoiCon(sensor,0)),
      temp: parseFloat(getChuoiCon(sensor,1)),
      time: formattedTime // Sử dụng timestamp của Firestore
    });

    // Lấy tất cả các tài liệu trong collection
    const documents = await db.collection('Data').get();
    const docCount = documents.size;

    // Nếu số lượng tài liệu nhiều hơn 600, xóa tài liệu cũ nhất
    if (docCount > 600) {
      const oldestDocQuery = await db.collection('Data').orderBy('time').limit(1).get();
      const oldestDoc = oldestDocQuery.docs[0];
      await oldestDoc.ref.delete();
      console.log('Oldest document deleted');
    }
    console.log('Firestore đã được cập nhật .');
    res.json({ message: 'Firestore đã được cập nhật thành công.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã có lỗi xảy ra trong quá trình cập nhật Firestore.' });
  }
};

module.exports = { predict, updateModel, updateFireStore };
