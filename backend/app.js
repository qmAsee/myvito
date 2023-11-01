const express = require('express');
const mongoose = require('mongoose');

const app = express();

const {
    PORT = 3000,
    MONGO_URL = 'mongodb://myvito',
} = process.env;

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})