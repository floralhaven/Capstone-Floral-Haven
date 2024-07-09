const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { MongoClient } = require('mongodb'); // Add MongoDB client

const app = express();
const PORT = 3000;
const mongoUri = 'mongodb+srv://Admin:IMXshfqLgjgzNZwN@originalcluster.g2m81ys.mongodb.net/?retryWrites=true&w=majority&appName=OriginalCluster';
const dbName = 'Capstone';

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..')));

// Connect to MongoDB
let db;
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
    })
    .catch(error => console.error(error));

// Handle sign-up POST request
app.post('/signup', (req, res) => {
    const userData = req.body;
    const usersCollection = db.collection('Users');

    usersCollection.insertOne(userData)
        .then(result => {
            res.json({ message: 'User signed up successfully!' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error saving user data' });
        });
});

// Handle login POST request
app.post('/login', (req, res) => {
    const loginData = req.body;
    const usersCollection = db.collection('Users');

    usersCollection.findOne({ email: loginData.email, password: loginData.password })
        .then(user => {
            if (user) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error reading user data' });
        });
});

// Endpoint to get data from a specific collection
app.get('/data/:collectionName', (req, res) => {
    const collectionName = req.params.collectionName;
    const collection = db.collection(collectionName);

    collection.find().toArray()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({ message: `Error fetching data from collection: ${collectionName}` });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
