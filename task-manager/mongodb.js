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
  
  
  db.collection('users').insertOne({
    _id: id,
    name: 'Denid',
    age: 32
  }, (error, result) => {
    if (error) () => console.log('Unable to insert user');

    console.log(result.ops);
  });
  
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