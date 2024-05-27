const {db, dbRealtime} = require('../firebase.js'); 
const User = require('../models/User.js'); 


exports.createUser = async (req, res, next) => {
    try {
      const data = req.body;
      const docRef = db.collection('User').doc();
      await docRef.set(data);
      res.status(200).send('user created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
      const users = await db.collection('User').get();
      const userArray = [];
  
      if (users.empty) {
        res.status(400).send('No User found');
      } else {
        users.forEach((doc) => {
          const data = new User(
            doc.id,
            doc.data().account,
            doc.data().name,
            doc.data().email,
            doc.data().phone,
            doc.data().pw,
          );
          userArray.push(data);
        });
  
        res.status(200).send(userArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await db.collection('User').doc(id).get();
      if (data.exists) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('user not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const dataRef = db.collection('User').doc(id);
      await dataRef.update(data);
      res.status(200).send('User updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      await db.collection('User').doc(id).delete();
      res.status(200).send('User deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
