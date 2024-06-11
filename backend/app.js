require('dotenv').config();
// require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router');
const { requestLogger, errorLogger } = require('./utils/logger');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use(requestLogger);
app.use(errorLogger);

app.use(router);

const {
  PORT = 3003,
} = process.env;

const MONGO_URL = 'mongodb://0.0.0.0:27017/myvito';

mongoose.connect(MONGO_URL)
  .then(() => console.log('Mongo connected'))
  .catch((err) => console.log(`err: ${err}`));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
