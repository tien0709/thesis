const {db, dbRealtime} = require('../firebase.js'); 
const Device = require('../models/Device.js'); 


exports.createDevice = async (req, res, next) => {
    try {
      const data = req.body;
      const docRef = db.collection('Devices').doc();
      await docRef.set(data);
      res.status(200).send('device created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.getDevices = async (req, res, next) => {
    try {
      const devices = await db.collection('Devices').get();
      const deviceArray = [];
  
      if (devices.empty) {
        res.status(400).send('No Device found');
      } else {
        devices.forEach((doc) => {
          const data = new Device(
            doc.id,
            doc.data().status,
            doc.data().location,
          );
          deviceArray.push(data);
        });
  
        res.status(200).send(deviceArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getDevice = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await db.collection('Devices').doc(id).get();
      if (data.exists) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('device not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.updateDevice = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const dataRef = db.collection('Devices').doc(id);
      await dataRef.update(data);
      res.status(200).send('Device updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.deleteDevice = async (req, res, next) => {
    try {
      const id = req.params.id;
      await db.collection('Devices').doc(id).delete();
      res.status(200).send('device deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
