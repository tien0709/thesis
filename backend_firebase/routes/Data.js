const express = require('express');

const { createData, getData, getDatas, updateData, deleteData } = require('../controllers/dataController.js');


const router = express.Router();

router.get('/data/', getDatas);
router.post('/data/new', createData);
router.get('/data/:id', getData);
router.put('/data/update/:id', updateData);
router.delete('/data/delete/:id', deleteData);

module.exports = router;