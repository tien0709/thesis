const express = require('express');
const Data = require('../models/Data');

const router = express.Router();



router.post('/api/dht/:location', async (req, res) => {
  try {
    const { temperature: temp, humidity: humi } = req.body.readings;
    const { location } = req.params;
    const currentDate = new Date();
    const Temp = await Data.findOneAndUpdate(
        { sensor_id: "TEMP_"+location,},
        { $set: { value: temp, time: currentDate } },
        { new: true } // Return the updated document
    );
    console.log(Temp);
    if (!Temp) {
        res.status(404).json({ message: 'Temp not found' });
        console.log('not found');
        return;
    }
    const Humidity = await Data.findOneAndUpdate(
      { sensor_id: "HUMI_"+location,},
      { $set: { value: humi, time: currentDate } },
      { new: true } // Return the updated document
    );
    if (!Humidity) {
      res.status(404).json({ message: 'Humidity not found' });
      console.log('not found');
    }

    else {
        res.json({ humidity: Humidity, temp: Temp });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
