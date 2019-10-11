const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoClient.connect(connectionUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, async (error, client) => {
  if (error) {
    console.log('Unable to connect db');
  }
  console.log('Connected correctly!');
  const db = client.db(databaseName);
  db.collection('users').insertOne({
    name: 'Denid',
    age: 32
  });

});