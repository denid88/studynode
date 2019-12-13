const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express();


app.use(bodyParser.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;