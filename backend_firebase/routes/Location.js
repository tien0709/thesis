const express = require('express');

const { createLocation, getLocation, getLocations, updateLocation, deleteLocation } = require('../controllers/locationController.js');


const router = express.Router();

router.get('/location/', getLocations);
router.post('/location/new', createLocation);
router.get('/location/:id', getLocation);
router.put('/location/update/:id', updateLocation);
router.delete('/location/delete/:id', deleteLocation);

module.exports = router;