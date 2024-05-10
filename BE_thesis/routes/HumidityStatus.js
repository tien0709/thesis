const express = require('express');
const sensor = require('../models/sensor');

const router = express.Router();

router.get('/api/humidityStatus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Input validation (optional):
    // if (!id || !/^[A-Z0-9]+$/.test(id)) {
    //   return res.status(400).json({ message: 'Invalid humidity ID format' });
    // }
    const latestHumidity = await sensor.findOne({
      deviceId: id, // Search by specific ID
    });
    if (latestHumidity) {
      res.json({ status: latestHumidity.status });
    } else {
      res.status(404).json({ message: 'Humidity not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//set Humi sensor by location

router.post('/api/humidityStatus/update', async (req, res) => {
  try {
    const { deviceId, location, status } = req.body;
    // Input validation (optional):
    // ... add any necessary validation checks for deviceId and status

    // Access your database or data storage mechanism (replace with your implementation):
    const updatedDocument = await sensor.findOneAndUpdate(
      { deviceId: deviceId,
        location: location},
      { $set: { status: status } },
      { new: true } // Return the updated document
    );
    console.log(updatedDocument);
    if (updatedDocument) {
      res.json({ message: 'Humidity status updated successfully' });
    } else {
      res.status(404).json({ message: 'Humidity status not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
