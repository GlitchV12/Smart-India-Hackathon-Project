// const mongoose = require('mongoose');

// const RouteSchema = new mongoose.Schema({
//   routeName: { type: String, required: true },
//   waypoints: [{ type: { type: String }, coordinates: [Number] }]
// });

// module.exports = mongoose.model('Route', RouteSchema);

const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    routeName: String,
    startLocation: String,
    endLocation: String
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
