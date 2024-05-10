const express = require('express');
const sensor = require('../models/sensor');

const router = express.Router();

router.get('/api/lightStatus/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Input validation (optional):
    // if (!id || !/^[A-Z0-9]+$/.test(id)) {
    //   return res.status(400).json({ message: 'Invalid humidity ID format' });
    // }

    const latestLight = await sensor.findOne({
      deviceId: id, // Search by specific ID
    });

    if (latestLight) {
      res.json({ status: latestLight.status });
    } else {
      res.status(404).json({ message: 'Light not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/LightStatus/update', async (req, res) => {
  try {
    const { deviceId, location, status } = req.body;
    // Input validation (optional):
    // ... add any necessary validation checks for deviceId and status

    // Access your database or data storage mechanism (replace with your implementation):
    const updatedDocument = await sensor.findOneAndUpdate(
      { deviceId: deviceId ,
        location: location,
      },
      { $set: { status: status } },
      { new: true } // Return the updated document
    );

    if (updatedDocument) {
      res.json({ message: 'Light status updated successfully' });
    } else {
      res.status(404).json({ message: 'Light status not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
