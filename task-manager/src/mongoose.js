const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

//const me = new User({name: 'Dmitry', age: 32});

/*
me.save()
  .then(r => console.log(r))
  .catch(e => console.log(e));
*/

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

const task = new Task({description: 'Learning Node.js', email: 'denid@gmail.com', completed: false});

task.save()
  .then(r => console.log(r))
  .catch(e => console.log(e));
