const express = require('express');
const sensor = require('../models/sensor');
const device = require('../models/device');

const router = express.Router();

//set Humi sensor by location

router.post('/api/status/update', async (req, res) => {
  try {
    const { id, newStatus } = req.body;
    // Input validation (optional):
    // ... add any necessary validation checks for deviceId and status

    // Access your database or data storage mechanism (replace with your implementation):
    const updatedSensor = await sensor.findOneAndUpdate(
       {_id: id},
      { $set: { status: newStatus } },
      { new: true } // Return the updated document
    );

    if (updatedSensor) {
      res.json({ message: 'sensor status updated successfully' });
    } else {
        const updatedDevice = await device.findOneAndUpdate(
            {_id: id},
           { $set: { status: newStatus} },
           { new: true } // Return the updated document
         );
         if (updatedDevice) {
            res.json({ message: 'device status updated successfully' });
        } 
        else {
            res.json({ message: 'device or sensor not found' });
        }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/api/status/updateWithVoice', async (req, res) => {
  try {
    const { type, location, newStatus } = req.body;
    // Input validation (optional):
    // ... add any necessary validation checks for deviceId and status

    const devices = await device.find({
      deviceId: { $regex: new RegExp(type, 'i') },
      location: location
    });
    let count = 0;
    
    for (const item of devices) {
      const updatedDevice = await device.updateOne({ _id: item._id }, { $set: { status: newStatus } }, { new: true });
      count++;
    }
    if (count) {
        res.json({ message: 'device status updated successfully' });
    } 
    else {
        res.json({ message: 'device not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
