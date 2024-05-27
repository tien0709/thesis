const express = require('express');

const { predict, updateModel, updateFireStore} = require('../controllers/MLController.js');


const router = express.Router();

router.post('/predict', predict);
router.get('/model/update', updateModel);
router.get('/firestore/update', updateFireStore);

module.exports = router;