const mongoose = require('mongoose');
const validator = rqeuire('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
    }
})