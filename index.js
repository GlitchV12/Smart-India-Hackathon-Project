const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.urlencoded({ extended: true })); // To parse form data

app.use(express.json());
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const startServer = async () => {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect("mongodb://localhost:27017/dtc");
        console.log("Connected to MongoDB");

        const db = client.db("dtc"); // Select the database
        const schedulescollection = db.collection("dutyschedules"); // Select the collection
        const routescollection = db.collection("routes");
        const collection = db.collection("users");

        // Route for the homepage
        app.get('/', (req, res) => {
            res.render('index');
        });

        app.get("/api/login", (req, res) => {
            res.render("login", { error: null });
        });

        app.get("/api/signup", (req, res) => {
            res.render("signup", { error: null });
        });

        app.post("/api/signup", async (req, res) => {
            const { name, password } = req.body;
            try {
                const existUsername = await collection.findOne({ name: req.body.name });
                if (existUsername) {
                    res.render("signup", { error: "Username already exists" });
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
                    const data = {
                        name,
                        password: hashedPassword,
                    };
                    await collection.insertOne(data);
                    res.render("home", { message: "Account created successfully!" });
                }
            } catch (error) {
                console.error("Error during signup:", error);
                res.status(500).send("Error during signup");
            }
        });

        app.post("/login", async (req, res) => {
            const { name, password } = req.body;
            try {
                const user = await collection.findOne({ name });
                if (user && await bcrypt.compare(password, user.password)) { // Compare the hashed password
                    res.render("home");
                } else {
                    res.render("login", { error: "Invalid username or password" });
                }
            } catch (error) {
                console.error("Error during login:", error);
                res.status(500).send("Error during login");
            }
        });


        app.get('/schedules', (req, res) => {
            res.render('schedules', { data: [] }); // render the HTML page with an empty data array
        });


        // Route for the Duty Scheduling page
        app.get('/api/schedules', async (req, res) => {
            try {
                const schedules = await schedulescollection.find({}).toArray();
                console.log('Schedules:', schedules); // Add this line to check the data
                res.render('schedules', { data: schedules });
            } catch (error) {
                console.error("Error fetching schedules:", error);
                res.status(500).send("Error fetching schedules");
            }
        });

        // Route for the Route Management page
        app.get('/api/routes', (req, res) => {
            res.render('routes');
        });

        // app.get('/api/report', (req, res) => {
        //     res.render('report');
        // });


        app.post('/api/schedules', async (req, res) => {
            // Handle form submission logic here
            try {
                const { busId, crewId, startTime, endTime } = req.body;
                const data = { busId, crewId, startTime, endTime };

                await schedulescollection.insertOne(data);

                console.log(`busId: ${busId}`);
                console.log(`crewId: ${crewId}`);
                console.log(`crewId: ${startTime}`);
                console.log(`crewId: ${endTime}`);

                res.redirect('/api/schedules');
            } catch (error) {
                console.error("Error saving route:", error);
                res.status(500).send("Internal Server Error");
            }
        });


        // Route for the Report page
        app.get('/api/report', async (req, res) => {
            try {
                const schedules = await schedulescollection.find({}).toArray();
                const routes = await routescollection.find({}).toArray();
                console.log('Schedules:', schedules); // Add this line to check the data
                console.log('Routes:', routes); // Add this line to check the data
                res.render('report', { schedules: schedules, routes: routes });
            } catch (error) {
                console.error("Error fetching data for report:", error);
                res.status(500).send("Error fetching data for report");
            }
        });


        app.post('/api/routes', async (req, res) => {
            try {
                const { routename, start, end } = req.body;
                const data = { routename, start, end };

                await routescollection.insertOne(data);

                console.log(`Route Name: ${routename}`);
                console.log(`Start Location: ${start}`);
                console.log(`End Location: ${end}`);

                res.redirect('/api/routes');
            } catch (error) {
                console.error("Error saving route:", error);
                res.status(500).send("Internal Server Error");
            }
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (error) {
        console.error("Error connecting to MongoDB or starting the server:", error);
    }
};

startServer();