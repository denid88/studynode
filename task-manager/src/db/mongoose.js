const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


//const me = new User({name: 'Dmitry', age: 32});

/*
me.save()
  .then(r => console.log(r))
  .catch(e => console.log(e));
*/
/*


const task = new Task({description: 'Learning Node.js', email: 'denid@gmail.com', completed: false});

task.save()
  .then(r => console.log(r))
  .catch(e => console.log(e));
*/