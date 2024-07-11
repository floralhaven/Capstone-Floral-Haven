const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
const connectToDB = require('./db'); // Import the DB connection module
require('dotenv').config(); // To load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

const saltRounds = 10; // Number of salt rounds for bcrypt

// Handle sign-up POST request
app.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const db = await connectToDB();
        const usersCollection = db.collection('users');

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Replace the plain password with the hashed password
        userData.password = hashedPassword;

        await usersCollection.insertOne(userData);
        res.json({ message: 'User signed up successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user data' });
    }
});

// Handle login POST request
app.post('/login', async (req, res) => {
    try {
        const loginData = req.body;
        const db = await connectToDB();
        const usersCollection = db.collection('users');

        // Find the user by email
        const user = await usersCollection.findOne({ email: loginData.email });

        if (user) {
            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(loginData.password, user.password);

            if (passwordMatch) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading user data' });
    }
});

// Endpoint to get data from a specific collection
app.get('/data/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    console.log("Collection Name", collectionName);
    try {
        const db = await connectToDB();
        const collection = db.collection(collectionName);
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching data from collection: ${collectionName}` });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});