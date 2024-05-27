const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  account: { type: String, required: true  },
  pw: { type: String, required: true  },
  email: { type: String, required: true },
  name: { type: String, requires: true},
  phone: { type: String, required: true},
});

module.exports =  mongoose.model('User', userSchema, 'User');

