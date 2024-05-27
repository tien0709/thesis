const {db, dbRealtime} = require('../firebase.js'); 
const Sensor = require('../models/Sensor.js'); 


exports.createSensor = async (req, res, next) => {
    try {
      const data = req.body;
      const docRef = db.collection('Sensor').doc();
      await docRef.set(data);
      res.status(200).send('sensor created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.getSensors = async (req, res, next) => {
    try {
      const sensors = await db.collection('Sensors').get();
      const sensorArray = [];
  
      if (sensors.empty) {
        res.status(400).send('No Sensor found');
      } else {
        sensors.forEach((doc) => {
          const data = new Sensor(
            doc.id,
            doc.data().status,
            doc.data().location,
          );
          sensorArray.push(data);
        });
  
        res.status(200).send(sensorArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getSensor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await db.collection('Sensors').doc(id).get();
      if (data.exists) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('sensor not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.updateSensor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const dataRef = db.collection('Sensors').doc(id);
      await dataRef.update(data);
      res.status(200).send('Sensor updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.deleteSensor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await db.collection('Sensor').doc(id).delete();
      res.status(200).send('sensor deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
