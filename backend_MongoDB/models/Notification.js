const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  time: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

module.exports =  mongoose.model('Notification', notificationSchema, 'Notification');

