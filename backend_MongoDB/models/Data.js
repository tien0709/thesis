const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  time: { type: Date, default: Date.now },
  sensor_id: { type: String, required: true },
});

module.exports =  mongoose.model('Data', dataSchema, 'Data');

