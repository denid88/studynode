const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
           if (!validator.isEmail(value)) {
               throw new Error('email wrong');
           }
        }
    },
    completed: {
        default: false,
        type: Boolean
    }
});

module.exports = Task;