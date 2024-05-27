const tf = require('@tensorflow/tfjs-node');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const fs = require('fs');
const csv = require('csv-parser');
const math = require('mathjs');
const { DateTime } = require('luxon');


async function createAndTrainModel(filePath) {
  const classifier = knnClassifier.create();
  const trainingSet = [];
  const trainingLabels1 = [];
  const trainingLabels2 = [];

  return new Promise((resolve, reject) => {
    let isFirstRow = true; // Biến để kiểm tra hàng đầu tiên

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (isFirstRow) {
          isFirstRow = false; // Bỏ qua hàng đầu tiên
          return;
        }

        // Tiền xử lý dữ liệu
      // Chuyển đổi cột 'time' sang định dạng datetime
        const time = DateTime.fromFormat(row['time'], 'dd-MM-yyyy HH:mm');

        // Tính số giây kể từ 00:00 cùng ngày
        const timeInSeconds = time.diff(time.startOf('day')).as('seconds'); // Tính số giây so với 0 giờ 00 phút
        const temp = +row['temp'];
        const humi = +row['humi'];

        // Thêm dữ liệu vào trainingSet và trainingLabels
        trainingSet.push([timeInSeconds, temp, humi]);
        trainingLabels1.push(+row['Led']);
        trainingLabels2.push(+row['Fan']);
      })
      .on('end', () => {
        // Kiểm tra nếu trainingSet không rỗng
        if (trainingSet.length === 0) {
          reject(new Error('Training set is empty.'));
          return;
        }

        // Thực hiện Data standarization sau khi đã đọc xong toàn bộ dữ liệu
        const meanTime = math.mean(trainingSet.map(item => item[0]));
        const stdTime = math.std(trainingSet.map(item => item[0]));
        const meanTemp = math.mean(trainingSet.map(item => item[1]));
        const stdTemp = math.std(trainingSet.map(item => item[1]));
        const meanHumi = math.mean(trainingSet.map(item => item[2]));
        const stdHumi = math.std(trainingSet.map(item => item[2]));

        const scaledTrainingSet = trainingSet.map(item => [
          (item[0] - meanTime) / stdTime,
          (item[1] - meanTemp) / stdTemp,
          (item[2] - meanHumi) / stdHumi
        ]);
        
        const dataset = {};
        // Khi đã đọc xong dữ liệu, thêm mẫu huấn luyện vào classifier
        scaledTrainingSet.forEach((item, index) => {
          classifier.addExample(tf.tensor1d(item), [trainingLabels1[index], trainingLabels2[index]]);
          const label1 = trainingLabels1[index];
          const label2 = trainingLabels2[index];
          const label = `${label1},${label2}`;
            // Chuyển đổi item thành tensor
          const tensorItem = tf.tensor2d([item]);
            // Thêm tensor vào dataset
          if (!dataset[label]) {
            dataset[label] = [];
          }
          dataset[label].push(tensorItem);
        });

        // Chuyển đổi các mảng tensor thành tensor stack
        for (const label in dataset) {
          dataset[label] = tf.stack(dataset[label]);
        }

        /*
        // Đầu tiên, chuyển đổi mảng dữ liệu thành các tensor
        const tensorTrainingSet = tf.tensor2d(trainingSet);
        const tensorTrainingLabels1 = tf.tensor1d(trainingLabels1);
        const tensorTrainingLabels2 = tf.tensor1d(trainingLabels2);

        const combinedLabels = tf.concat([tensorTrainingLabels1, tensorTrainingLabels2]);*/

        classifier.setClassifierDataset(dataset);

        resolve(classifier);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}


async function saveModel(classifier, filePath) {
  const dataset = classifier.getClassifierDataset();
  const datasetObj = Object.keys(dataset).reduce((result, key) => {
    result[key] = dataset[key].arraySync();
    return result;
  }, {});

  fs.writeFileSync(filePath, JSON.stringify(datasetObj));
}

async function loadModel(filePath) {
  const classifier = knnClassifier.create();
  const datasetObj = JSON.parse(fs.readFileSync(filePath));

  const tensorObj = Object.keys(datasetObj).reduce((result, key) => {
    result[key] = tf.tensor(datasetObj[key]);
    return result;
  }, {});

  classifier.setClassifierDataset(tensorObj); // Thêm giá trị k vào đây
  return classifier;
}

module.exports = { createAndTrainModel, saveModel, loadModel };
