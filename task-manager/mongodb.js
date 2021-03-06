const { MongoClient, ObjectID } = require('mongodb');

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, async (error, client) => {
  if (error) {
    console.log('Unable to connect db');
  }
  console.log('Connected correctly!');
  const db = client.db(databaseName);
  
  db.collection('users').deleteMany({
    age: 24
  }).then((r) => console.log(r))
  .catch(e => console.log(e))
  
  /*
  db.collection('tasks').updateMany({
      status: false
  },{
    $set: {
      status: true
    }
  }, (error, result) => {
    if (error) () => console.log(error);
    console.log(result);
  });*/


  /*
  db.collection('tasks').find({status: false}).toArray((error, tasks) => {
    if (error) () => console.log(error);

    console.log(tasks);
  });*/
  /*
  db.collection('tasks').insertMany([
    {
      task: 'Learning Wordpress',
      status: true
    },
    {
      task: 'Learning Node.js',
      status: false
    },
    {
      task: 'Learning React.js',
      status: false
    },
], (error, result) => {
    if (error) () => console.log('Unable to insert user');

    console.log(result.ops);
  });*/
   
 /*
 db.collection('users').insertMany([
  {
    description: 'Learn node js',
    completed: false
  },
  {
    description: 'Learn react js',
    completed: true
  },
  ], (error, result) => {
  if (error) () => console.log('Unable to insert user');
  
  console.log(result.ops);
})*/

});