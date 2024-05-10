const express = require('express');
const Notification = require('../models/Notification');
const http = require('http');
const { Server } = require('ws');

const router = express.Router();


const port = 3006;

router.get('/api/notifications', (req, res) => {
  res.send('Notification endpoint');
});

const server = http.createServer(express);
const wsServer = new Server({ server });

wsServer.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const notificationData = JSON.parse(message);
    console.log('Received notification request:', notificationData);

    // Send notification data to connected React Native applications
    wsServer.clients.forEach((client) => {
      if (client.readyState === wsServer.OPEN) {
        client.send(JSON.stringify(notificationData));
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




module.exports = router;
