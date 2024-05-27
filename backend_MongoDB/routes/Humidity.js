const express = require('express');
const Data = require('../models/Data');

const router = express.Router();

//get Humi by location
router.get('/api/humidity/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Input validation (optional):
    // if (!id || !/^[A-Z0-9]+$/.test(id)) {
    //   return res.status(400).json({ message: 'Invalid humidity ID format' });
    // }

    const latestHumidity = await Data.findOne({
      sensor_id: id, // Search by specific ID
    });

    if (latestHumidity) {
      res.json({ humidity: latestHumidity.value });
    } else {
      res.status(404).json({ message: 'Humidity not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/humidity/update', async (req, res) => {
  try {
    const { id, value, time } = req.body;

    // Input validation (optional):
    // if (!id || !/^[A-Z0-9]+$/.test(id)) {
    //   return res.status(400).json({ message: 'Invalid humidity ID format' });
    // }

    const Humidity = await Data.findOneAndUpdate(
      { sensor_id: id,},
      { $set: { value: value, time: time } },
      { new: true } // Return the updated document
    );

    if (Humidity) {
      res.json({ humidity: Humidity.value });
    } else {
      res.status(404).json({ message: 'Humidity not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
