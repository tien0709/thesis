const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const temperatureRoutes = require('./routes/Temperature');
const humidityRoutes = require('./routes/Humidity');
const lightRoutes = require('./routes/Light');
const temperatureStatusRoutes = require('./routes/TemperatureStatus');
const humidityStatusRoutes = require('./routes/HumidityStatus');
const lightStatusRoutes = require('./routes/LightStatus');
const locationRoutes = require('./routes/Location');
const deviceRoutes = require('./routes/Device');
const userRoutes = require('./routes/User');
const statusRoutes = require('./routes/status');
const speechToTextRoutes = require('./routes/SpeechToText'); 
const notificationRoutes = require('./routes/Notification'); 
const sensorRoutes = require('./routes/Sensor'); 
//const corsMiddleware = require('./middlewares/cors');
const cors = require('cors');


console.log('Starting the application...');
const app = express();
const PORT1= 3005;
const PORT2= 3006;
// Increase limit to 5mb (default is 100kb)
app.use(bodyParser.json({limit: '50mb'}));


// Kết nối với MongoDB
mongoose.connect('mongodb+srv://tienphanbk:mRLQGZJecSkSYsji@cluster0.4pp57rb.mongodb.net/thesis?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Sử dụng routes
app.use(temperatureRoutes);
app.use(humidityRoutes);
app.use(lightRoutes);
app.use(temperatureStatusRoutes);
app.use(humidityStatusRoutes);
app.use(lightStatusRoutes);
app.use(locationRoutes);
app.use(deviceRoutes);
app.use(userRoutes);
app.use(statusRoutes);
app.use(speechToTextRoutes);
app.use(notificationRoutes);
app.use(sensorRoutes);

//app.use(corsMiddleware);
// 👇️ configure CORS
app.use(cors());

// Thêm route để xử lý yêu cầu GET tại "/"
app.get('/', (req, res) => {
  res.send('Hello, this is the root endpoint!');
});

app.listen(PORT1, () => {
  console.log(`Server1 is running on port ${PORT1}`);
});
app.listen(PORT2, () => {
  console.log(`Server2 is running on port ${PORT2}`);
});
