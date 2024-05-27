const config = require ('../config.js');
const {db, dbRealtime} = require('../firebase.js'); 
const Notification = require('../models/Notification.js'); 
const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');
const token = '6774365968:AAHBLz-KaRBCmY5rZgqFCTxNC-KWXANoM9w';
const chatId = '6229888439';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const axios = require('axios');
let method = 'sendMessage';
let url = `https://api.telegram.org/bot${token}/${method}`;


/*bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, 'Received your message');
});*/
exports.createNotification = async (req, res, next) => {
    try {

      const notification = {
        time: new Date(),
        isRead: false,
        content: 'Phát hiện nguy cơ cháy nổ',
      };
      const docRef = db.collection('Notification').doc();
      await docRef.set(notification);
/*
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: config.email,
          pass: config.password
        }, tls: {
          rejectUnauthorized: false
        }
      });
  
      // Define the email options
      const mailOptions = {
        from: "tien.phanbk@hcmut.edu.vn",
        to: 'tiena3pvd@gmail.com',
        subject: 'cảnh báo từ smarthome',
        text: 'Phát hiện nguy cơ cháy nổ!',
      };
  
      // Send the email
      const sendMail = async (mailOptions, callback) => {
        try {
          const info = await transporter.sendMail(mailOptions)
          res.json({ message: 'Notification sent and stored successfully!', notification })
          console.log("MESSAGE ID: ", info.messageId);
        } catch (error) {
          console.log(error);
        } 
      };
      await sendMail(mailOptions);
      response = requests.post(
        url='https://api.telegram.org/bot{0}/{1}'.format(token, method),
        data={'chat_id': 12345, 'text': 'hello friend'}
    ).json()
*/  let data = {
      chat_id: chatId,
      text: 'Phát hiện nguy cơ cháy nổ'
    };
    axios.post(url, data)
    .then(response => {
        console.log(response.data);
        res.send('create notification succeccfully');
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Error sending Telegram message');
    });
      // Insert notification into the databas
    } catch (error) {
      res.status(400).send(error.message);
      
    }
};

exports.getNotifications = async (req, res, next) => {
    try {
      const notifications = await db.collection('Notification').get();
      const notificationArray = [];
  
      if (notifications.empty) {
        res.status(400).send('No notification found');
      } else {
        notifications.forEach((doc) => {
          const data = new Notification(
            doc.id,
            doc.data().content,
            doc.data().time,
            doc.data().isReaded,
          );
          notificationArray.push(data);
        });
  
        res.status(200).send(notificationArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getNotification = async (req, res, next) => {
    try {
      const id = req.params.id;
      const notification = await db.collection('Notification').doc(id).get();
      if (notification.exists) {
        res.status(200).send(notification.data());
      } else {
        res.status(404).send('notification not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.updateNotification = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const dataRef = db.collection('Notification').doc(id);
      await dataRef.update(data);
      res.status(200).send('Notifiocation updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.deleteNotification = async (req, res, next) => {
    try {
      const id = req.params.id;
      await db.collection('Notification').doc(id).delete();
      res.status(200).send('notification deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
