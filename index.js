const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true })); // To parse form data


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the Duty Scheduling page
app.get('/api/schedules', (req, res) => {
    res.render('schedules');
});

// Route for the Route Management page
app.get('/api/routes', (req, res) => {
    res.render('routes');
});


app.post('/api/schedules', (req, res) => {
    // Handle form submission logic here
    console.log(req.body);
    res.redirect('/api/schedules');
});



app.post('/api/routes', (req, res) => {
    const { routename, start, end } = req.body;
    
    // Process the data (e.g., save to database)
    console.log(`Route Name: ${routename}`);
    console.log(`Start Location: ${start}`);
    console.log(`End Location: ${end}`);
    
    // Send a response
    res.send('Schedule added successfully');
    res.redirect('/api/routes');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));