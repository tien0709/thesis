const {db, dbRealtime} = require('../firebase.js'); 
const Location = require('../models/Location.js'); 


exports.createLocation = async (req, res, next) => {
    try {
      const data = req.body;
      const docRef = db.collection('Location').doc();
      await docRef.set(data);
      res.status(200).send('location created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.getLocations = async (req, res, next) => {
    try {
      const locations = await db.collection('Location').get();
      const locationArray = [];
  
      if (locations.empty) {
        res.status(400).send('No Location found');
      } else {
        locations.forEach((doc) => {
          const data = new Location(
            doc.id,
            doc.data().name,
          );
          locationArray.push(data);
        });
  
        res.status(200).send(locationArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getLocation = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await db.collection('Location').doc(id).get();
      if (data.exists) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('location not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.updateLocation = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const dataRef = db.collection('Location').doc(id);
      await dataRef.update(data);
      res.status(200).send('Location updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.deleteLocation = async (req, res, next) => {
    try {
      const id = req.params.id;
      await db.collection('Location').doc(id).delete();
      res.status(200).send('location deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
