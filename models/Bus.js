const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  assignedCrew: { type: String, default: null },
  dutyType: { type: String, enum: ['linked', 'unlinked'], required: true },
});

module.exports = mongoose.model('Bus', BusSchema);
