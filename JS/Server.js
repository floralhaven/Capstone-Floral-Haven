const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const connectToDB = require('./db'); 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

const saltRounds = 10; // Number of salt rounds for bcrypt

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
    try {
        const loginData = req.body;
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        const user = await usersCollection.findOne({ username: loginData.username });

        if (user) {
            const passwordMatch = await bcrypt.compare(loginData.password, user.password);

            if (passwordMatch) {
                res.json({ success: true, message: 'Login successful', userId: user._id }); 
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

// Handle garden layout saving POST request
app.post('/user/:userId/layout', async (req, res) => {
    try {
        const { userId } = req.params;
        const layoutData = req.body;
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (user) {
            user.layouts.push(layoutData);
            await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { layouts: user.layouts } }
            );
            res.json({ message: 'Layout saved successfully!' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving layout data' });
    }
});

// Fetch layouts by user ID
app.get('/user/:userId/layouts', async (req, res) => {
    const userId = req.params.userId;
    try {
        const db = await connectToDB();
        const layoutsCollection = db.collection('Layouts');
        const layouts = await layoutsCollection.find({ userId }).toArray();
        res.json(layouts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user layouts' });
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

// Handle password change POST request
app.post('/change-password', async (req, res) => {
    const { oldpassword, newpassword, userId } = req.body;

    try {
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(oldpassword, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newpassword, saltRounds);

        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: hashedNewPassword } }
        );

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});