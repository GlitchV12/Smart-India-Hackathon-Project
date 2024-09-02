const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

router.get('/', async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

router.post('/', async (req, res) => {
  const newBus = new Bus(req.body);
  await newBus.save();
  res.json(newBus);
});

module.exports = router;
