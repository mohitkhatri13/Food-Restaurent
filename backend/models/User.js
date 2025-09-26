const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['customer', 'staff'],
    required: true
  },
  token: {
    type: String
  },
});

module.exports = mongoose.model('User', userSchema);

