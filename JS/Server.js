const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the JWT library
const { ObjectId } = require('mongodb');
const connectToDB = require('./db');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('Users', userSchema);


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

const saltRounds = 10;
const JWT_SECRET = '50ba26ff8b7266b06595408f3ea8a1670d6f021aa7c27adb8741cacbccb587c50d7105cf32681b2d0eea0de68d5293dbce69f666061810cedac7fdcc218ee2f7'; 

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
}

// Handle sign-up POST request
app.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        userData.password = hashedPassword;

        await usersCollection.insertOne(userData);
        res.json({ message: 'User signed up successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user data' });
    }
});

// Handle login POST request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Handle logout
app.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

// Handle garden layout saving POST request
// Fetch layouts by user ID
app.get('/data/layouts/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const db = await connectToDB();
        const layoutsCollection = db.collection('Layouts');

        const layouts = await layoutsCollection.find({ userId }).toArray();
        res.json(layouts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching layouts' });
    }
});

// Save a new layout
app.post('/data/layouts', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user; // Get userId from JWT
        const layoutData = req.body;
        const db = await connectToDB();
        const layoutsCollection = db.collection('Layouts');

        layoutData.userId = userId; // Associate layout with user
        await layoutsCollection.insertOne(layoutData);

        res.json({ message: 'Layout saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving layout' });
    }
});

// Endpoint to get data from a specific collection
app.get('/data/:collectionName', async (req, res) => {
    const collectionName = req.params.collectionName;
    const commonName = req.query.commonName; // Optional query parameter

    try {
        const db = await connectToDB();
        const collection = db.collection(collectionName);

        let data;
        if (commonName) {
            data = await collection.find({ commonName }).toArray();
        } else {
            data = await collection.find().toArray();
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching data from collection: ${collectionName}` });
    }
});

app.post('/change-password', async (req, res) => {
    const { oldpassword, newpassword, userId } = req.body;

    try {
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        if (!userId || !oldpassword || !newpassword) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(oldpassword, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newpassword, saltRounds);

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: hashedNewPassword } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(500).json({ message: 'Password update failed' });
        }

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});