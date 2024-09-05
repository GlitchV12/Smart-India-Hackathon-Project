const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// Create a new route
router.post('/', async (req, res) => {
  try {
    const { routename, start, end } = req.body;
    const newRoute = new Route({ routename, start, end });
    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
    res.redirect('/routes');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().populate('start').populate('end');
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('start').populate('end');
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a route by ID
router.put('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a route by ID
router.delete('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;