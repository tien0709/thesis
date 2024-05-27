const {db, dbRealtime} = require('../firebase.js'); 
const Data = require('../models/Data.js'); 


exports.createData = async (req, res, next) => {
    try {
      const data = req.body;
      const docRef = db.collection('Data').doc();
      await docRef.set(data);
      res.status(200).send('data created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.getDatas = async (req, res, next) => {
    try {
      const datas = await db.collection('Data').get();
      const dataArray = [];
  
      if (datas.empty) {
        res.status(400).send('No Data found');
      } else {
        datas.forEach((doc) => {
          const data = new Data(
            doc.id,
            doc.data().time,
            doc.data().value,
          );
          dataArray.push(data);
        });
  
        res.status(200).send(dataArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getData = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await db.collection('Data').doc(id).get();
      if (data.exists) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('data not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.updateData = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const dataRef = db.collection('Data').doc(id);
      await dataRef.update(data);
      res.status(200).send('Data updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.deleteData = async (req, res, next) => {
    try {
      const id = req.params.id;
      await db.collection('Data').doc(id).delete();
      res.status(200).send('data deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
