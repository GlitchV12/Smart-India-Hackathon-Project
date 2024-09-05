const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/dtc');
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

connectDB();

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    routename: String,
    start: String,
    end: String
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
