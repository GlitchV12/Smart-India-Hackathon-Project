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

const routeSchema = new mongoose.Schema({
    routeName: String,
    start: String,
    end: String
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
