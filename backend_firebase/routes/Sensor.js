const express = require('express');

const { createSensor, getSensor, getSensors, updateSensor, deleteSensor } = require('../controllers/sensorController.js');

const router = express.Router();

router.get('/sensor/', getSensors);
router.post('/sensor/new', createSensor);
router.get('/sensor/:id', getSensor);
router.put('/sensor/update/:id', updateSensor);
router.delete('/sensor/delete/:id', deleteSensor);

module.exports = router;