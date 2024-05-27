const Data = require('../models/Data');
const express = require('express');
const router = express.Router();

router.get('/api/temperature/:id', async (req, res) => {
      const { id } = req.params;
  try {
    const latestTemperature = await Data.findOne({
      sensor_id: id, // Search by specific ID
    });

    if (latestTemperature) {
      res.json({ temperature: latestTemperature.value });
    } else {
      res.status(404).json({ message: 'Temperature not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/temperature/update', async (req, res) => {
  try {
    const { id, value, time } = req.body;

    // Input validation (optional):
    // if (!id || !/^[A-Z0-9]+$/.test(id)) {
    //   return res.status(400).json({ message: 'Invalid humidity ID format' });
    // }

    const Temperature = await Data.findOneAndUpdate(
      { sensor_id: id,},
      { $set: { value: value, time: time } },
      { new: true } // Return the updated document
    );

    if (Temperature) {
      res.json({ temperature: Temperature.value });
    } else {
      res.status(404).json({ message: 'tempature not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
