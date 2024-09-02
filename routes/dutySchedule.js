const express = require('express');
const router = express.Router();
const DutySchedule = require('../models/DutySchedule');

// Get all duty schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await DutySchedule.find().populate('busId');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific duty schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await DutySchedule.findById(req.params.id).populate('busId');
    if (!schedule) return res.status(404).json({ message: 'Duty schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new duty schedule
router.post('/', async (req, res) => {
  const { crewMember, busId, dutyType, startTime, endTime } = req.body;
  
  const newDutySchedule = new DutySchedule({
    crewMember,
    busId,
    dutyType,
    startTime,
    endTime,
  });

  try {
    const savedSchedule = await newDutySchedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a duty schedule by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSchedule = await DutySchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchedule) return res.status(404).json({ message: 'Duty schedule not found' });
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a duty schedule by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSchedule = await DutySchedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) return res.status(404).json({ message: 'Duty schedule not found' });
    res.json({ message: 'Duty schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
