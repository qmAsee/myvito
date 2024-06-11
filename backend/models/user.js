const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({
  nick: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
