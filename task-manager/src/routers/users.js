const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});
  } catch (e) {
      res.status(400).send(e);
  }
});

router.get('/users', auth, async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).send(users);
  } catch (e) {
      res.status(500).send(e);
  }
})


router.get('/users/me', auth, async (req, res) => {
  res.status(200).send(req.user);
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
      res.status(500).send(e);
  }
});


router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
      return res.status(400).send({error : 'Invalid updates!'});
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update]);
      await req.user.save();
      res.status(200).send(req.user);
  } catch(e) {
      res.status(500).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  const _id = req.user._id;
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
      res.status(500).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentionals(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({user, token});
  } catch (e) {
      res.status(400).send(e);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      print(token);
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(400).send();
  } catch (e) {
      res.status(500).send(e);
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    
  } catch (e) {
      res.status(500).send(e);
  }
});

const upload = multer({
  dest: 'avatar',
});

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
  res.status(200).send();
});

module.exports = router;