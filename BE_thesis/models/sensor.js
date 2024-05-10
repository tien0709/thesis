const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  deviceId: { type: String, required: true }, 
  status: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('sensor', sensorSchema, 'Sensors');
