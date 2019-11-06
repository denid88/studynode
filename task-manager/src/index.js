const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');


const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server listen port ${port}`);
})

