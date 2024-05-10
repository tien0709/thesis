const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  time: { type: Date, default: Date.now },
  _id: { type: Number, required: true },
});

module.exports =  mongoose.model('Notification', notificationSchema, 'Notification');

