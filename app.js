const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Routes

// Serve the login page from the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the login page from the '/login' route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle user signup
app.post('/user/signup', (req, res) => {
    const { username, password } = req.body;
    console.log(`User signed up with username: ${username}`);
    res.redirect('/');
});

// Handle user login
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`User logged in with username: ${username}`);
    res.redirect('/home');  // Redirect to home after login
});

// Serve the home page (dashboard)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

