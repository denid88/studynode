const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId(); 
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@gmail.com',
  password: '120588m',
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}

const userTwoId = new mongoose.Types.ObjectId(); 
const userTwo = {
  _id: userTwoId,
  name: 'Iron',
  email: 'iron@gmail.com',
  password: '120588i',
  tokens: [{
    token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description:'Learn HTML',
  owner: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description:'Learn CSS',
  owner: userTwo._id
}

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(taskOne).save();
  await new User(taskTwo).save();
}

module.exports = {
  userOne,
  userOneId,
  setupDatabase
}