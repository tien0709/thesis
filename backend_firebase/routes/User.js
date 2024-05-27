const express = require('express');

const { createUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/userController.js');

const router = express.Router();

router.get('/user/', getUsers);
router.post('/user/new', createUser);
router.get('/user/:id', getUser);
router.put('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);

module.exports = router;
