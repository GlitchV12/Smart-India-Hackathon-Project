// const mongoose = require('mongoose');

// const DutyScheduleSchema = new mongoose.Schema({
//   crewMember: { type: String, required: true },
//   busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
//   dutyType: { type: String, enum: ['linked', 'unlinked'], required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
// });

// module.exports = mongoose.model('DutySchedule', DutyScheduleSchema);


const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    routeName: String,
    startLocation: String,
    endLocation: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
