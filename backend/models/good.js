const mongoose = require('mongoose');
const validator = require('validator');

const goodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 70,
  },

  photo: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Некорректный URL-адрес');
      }
    },
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  address: {
    type: String,
    required: true,
    default: 'Пользователь предпочёл скрыть адрес',
  },

  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('good', goodSchema);
