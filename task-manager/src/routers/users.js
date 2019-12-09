const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCanceledEmail } = require('../emails/account');

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
      await user.save();
      const token = await user.generateAuthToken();
      sendWelcomeEmail(user.email, user.name);
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
    sendCanceledEmail(req.user.email, req.user.name);
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
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      cb(new Error('Please upload an image!'));
    }

    cb(undefined, true)
  }
});

router.post('/users/me/avatar', auth, upload.single('upload'), async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({
      width: 100,
      height: 100
    })
    .png()
    .toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.status(200).send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).send('Avatar deleted!');
});

router.get('/users/me/avatar', auth, async (req, res) => {
  try {
    if (req.user.avatar !== undefined) {

      res.set({'Content-Type': 'image/png'}).status(200).send(req.user.avatar);
    } else {
      res.status(500).send('Error image file');
    }
    
  } catch(e) {
    res.status(500).send(e);
  }
});

module.exports = router;