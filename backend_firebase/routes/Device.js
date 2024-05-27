const express = require('express');

const { createDevice, getDevices, getDevice, updateDevice, deleteDevice } = require('../controllers/deviceController.js');
const router = express.Router();

router.get('/device/', getDevices);
router.post('/device/new', createDevice);
router.get('/device/:id', getDevice);
router.put('/device/update/:id', updateDevice);
router.delete('/device/delete/:id', deleteDevice);

module.exports = router;