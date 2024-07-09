const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const PORT = 3000;
//mongodb+srv://Admin:<password>@originalcluster.g2m81ys.mongodb.net/?retryWrites=true&w=majority&appName=OriginalCluster
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..')));

// Handle sign-up POST request
app.post('/signup', (req, res) => {
    const userData = req.body;
    const filePath = path.join(__dirname, '..', 'Data', 'user.json');

    // Read existing data or create a new array if the file doesn't exist
    fs.readFile(filePath, 'utf8', (err, data) => {
        let users = [];
        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (parseErr) {
                // If parsing fails, log the error and reset users to an empty array
                console.error('Error parsing existing JSON data:', parseErr);
            }
        }

        // Add new user data
        users.push(userData);

        // Save updated data back to the file
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Error saving user data' });
            }
            res.json({ message: 'User signed up successfully!' });
        });
    });
});

// Handle login POST request
app.post('/login', (req, res) => {
    const loginData = req.body;
    const filePath = path.join(__dirname, '..', 'Data', 'user.json');

    // Read existing user data
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseErr) {
            // If parsing fails, log the error and send a failure response
            console.error('Error parsing existing JSON data:', parseErr);
            return res.status(500).json({ message: 'Error parsing user data' });
        }

        // Check if the login credentials match any user
        const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});