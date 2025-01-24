const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = new User({ name, email, age });
  try {
    await newUser.save();
    return res.status(201).json(newUser); // Added return
  } catch (error) {
    return res.status(400).json({ error: error }); // Added return
  }
});

router.get('/', async (req, res) => {
  try {
    const showAllUsers = await User.find({});
    return res.send(showAllUsers); // Added return
  } catch (error) {
    return res.status(400).json({ error: error }); // Added return
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Added return
    }
    return res.send(user); // Added return
  } catch (error) {
    return res.status(400).json({ error: error }); // Added return
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' }); // Added return
    }
    return res.json({ message: 'User deleted successfully', user: deletedUser }); // Added return
  } catch (error) {
    return res.status(400).json({ error: error }); // Added return
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Added return
    }
    return res.send(user); // Added return
  } catch (error) {
    return res.status(400).json({ error: error }); // Added return
  }
});

module.exports = router;
