const express = require('express');
const Data = require('../models/Data');

const router = express.Router();

router.get('/api/light/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Input validation (optional):
    // if (!id || !/^[A-Z0-9]+$/.test(id)) {
    //   return res.status(400).json({ message: 'Invalid humidity ID format' });
    // }

    const latestLight = await Data.findOne({
      sensor_id: id, // Search by specific ID
    });
    if (latestLight) {
      res.json({ light: latestLight.value });
    } else {
      res.status(404).json({ message: 'Light not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
