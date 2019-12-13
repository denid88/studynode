const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
        
  const response = await request(app).post('/users').send({
    name: "Andrew",
    email: "andrew@gmail.com",
    password: "120588c"
  }).expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});

test('Should login existing user', async () => {
        
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);
});

test('Should not login noexisting user', async () => {
        
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'this is not my pass'
  }).expect(400);
});

test('Should get profile for user', async () => {
        
  await request(app).get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send().expect(200);
});

test('Should not get profile for notifications user', async () => {
        
  await request(app).get('/users/me')
        .set('Authorization',`Bearer token`)
        .send().expect(401);
});

test('Should delete user', async () => {
        
  await request(app).delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send().expect(200);
});

test('Should delete user', async () => {
        
  await request(app).delete('/users/me')
        .send().expect(401);
});

test('Should upload image avatar', async () => {
        
  await request(app).post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('upload', 'tests/fixtures/xbox.jpg')
        .expect(200)
  
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
        
  await request(app).patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
          name: 'Jess'
        })
        .expect(200)
  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Jess');

});

test('Should not update valid user fields', async () => {
        
  await request(app).patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
          location: 'Kiev'
        })
        .expect(400)

});