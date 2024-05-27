
const express = require('express');
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

const router = express.Router();

router.get('/api/notifications', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tien.phanbk@hcmut.edu.vn',
        pass: 'adsu eckx zucu gyig',
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'tien.phanbk@hcmut.edu.vn', 
      to: 'tiena3pvd@gmail.com',
      subject: 'cảnh báo từ smarthome',
      text: 'Phát hiện nguy cơ cháy nổ!',
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    
    // Insert notification into the database
    const notification = await Notification.create({
      time: new Date(),
      isRead: false,
      content: 'Phát hiện nguy cơ cháy nổ',
    }, { versionKey: false });

    // Send a success response
    res.json({ message: 'Notification sent and stored successfully!', notification });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending notification' });
  }
});

router.get('/api/allNotifications', async (req, res) => {
  try {
    // Insert notification into the database
    const notification = await Notification.find();
    if (!notification.length) {
      return res.status(404).json({ message: 'No notification found' });
    }
    console.log(notification);
    // Return response with array of notification values (or full locations)
    res.json({ notification: notification }); // Flexibility for data format

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending notification' });
  }
});

module.exports = router;

