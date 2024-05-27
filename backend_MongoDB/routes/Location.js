const express = require('express');
const Location = require('../models/Location');

const router = express.Router();
router.get('/api/locations', async (req, res) => {
  try {
    // Retrieve all locations
    const locations = await Location.find();
    // Check if locations exist
    if (!locations.length) {
      return res.status(404).json({ message: 'No locations found' });
    }
    // Return response with array of light values (or full locations)
    res.json({ locations: locations }); // Flexibility for data format
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
