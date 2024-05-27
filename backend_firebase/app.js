const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config.js'); // Assuming config.js exports a configuration object
const dataRoute = require('./routes/Data.js');
const deviceRoute = require('./routes/Device.js');
const locationRoute = require('./routes/Location.js');
const notificationRoute = require('./routes/Notification.js');
const sensorRoute = require('./routes/Sensor.js');
const speechtotextRoute = require('./routes/SpeechToText.js');
const userRoute = require('./routes/User.js');
const mlRoute = require('./routes/callML.js');

const app = express();

app.use(cors());

// them cai nay khong dam bao het payload ma phai chinh node_modules\body-parser\lib\types\json.js
// nhung lam nay de du lieu gui di ok
app.use(express.json());
// Increase limit to 5mb (default is 100kb)
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
//routes
app.use('/api', dataRoute);
app.use('/api', deviceRoute);
app.use('/api', locationRoute);
app.use('/api', notificationRoute);
app.use('/api', sensorRoute);
app.use('/api', speechtotextRoute);
app.use('/api', userRoute);
app.use('/api', mlRoute);


app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
