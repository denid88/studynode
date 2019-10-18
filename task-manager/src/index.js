const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(r => res.status(201).send(r))
    .catch(e => {
        res.status(400);
        res.send(e);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(r => res.status(201).send(r))
    .catch(e => {
        res.status(400).send(e);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then(r => {
        res.status(200).send(r);
    }).catch(e => {
        res.status(500).send(e);
    });
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then(r => {
        if (!r) {
            res.status(404).send();
        }
        
        res.status(200).send(r);
    }).catch(e => {
        res.status(500).send(e);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then(r => {
        res.status(200).send(r);
    }).catch(e => {
        res.status(500).send(e);
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then(r => {
        if (!r) {
            res.status(404).send();
        }
        
        res.status(200).send(r);
    }).catch(e => {
        res.status(500).send(e);
    });
});

app.listen(port, () => {
    console.log(`Server listen port ${port}`);
})