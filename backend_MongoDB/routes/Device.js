const express = require('express');
const device = require('../models/device');
const sensor = require('../models/sensor');

const router = express.Router();
// device bao gồm device và sensor
router.get('/api/devices', async (req, res) => {
  const { deviceId, location } = req.query;
  try {
    if(deviceId === 'Sensor') {
        const devices = location?await sensor.find({location: location}):await sensor.find();
            // Check if device exist
        if (!devices.length) {
            return res.status(404).json({ message: 'No device found' });
        }
    
            // Return response with array of light values (or full devices)
            res.json({ devices: devices }); // Flexibility for data format
            return;
    } 
    // Retrieve all device
    const devices = location?await device.find({ deviceId: { $regex: new RegExp(deviceId, 'i') }, location: location }):await device.find({ deviceId: { $regex: new RegExp(deviceId, 'i') } });
    // Check if device exist
    if (!devices.length) {
      return res.status(404).json({ message: 'No device found' });
    }

        // Return response with array of light values (or full devices)
        res.json({ devices: devices }); // Flexibility for data format
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
 }
});

router.get('/api/devicesandsensors', async (req, res) => {
    try {
        // Retrieve all sensor
          const devices = await device.find();
         // Retrieve all device
         const sensors = await sensor.find();
         //
         const combinedData = devices.concat(sensors);
              // Check if device exist
          if (!combinedData.length) {
              return res.status(404).json({ message: 'No device found' });
          }
      
              // Return response with array of light values (or full devices)
              res.json({ devices: combinedData }); // Flexibility for data format
              return;
    } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
   }
  });

  //for esp32
  router.get('/api/device/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      // Retrieve all device
      const Device = await device.findOne({ deviceId: id});
      console.log(Device);
      if (!Device) {
        return res.status(404).json({ message: 'No device found' });
      }
  
          // Return response with array of light values (or full devices)
          res.json({ device: Device }); // Flexibility for data format
    } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
   }
  });

module.exports = router;
