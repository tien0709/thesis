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

module.exports = router;
