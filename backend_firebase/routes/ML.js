const express = require('express');

const { predict } = require('../controllers/MLController.js');


const router = express.Router();

router.get('/predict', predict);
router.update('/ML', predict);

module.exports = router;