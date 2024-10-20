const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySecureP@ss1',
    database: 'social_app'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// File upload setup using multer
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/user/signup', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err) => {
        if (err) {
            console.error('Error signing up:', err);
            return res.status(500).send('Error signing up.');
        }
        res.redirect('/');
    });
});

app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in.');
        }
        if (results.length > 0) {
            res.redirect('/home');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Serve pages for services
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'news.html'));
});

app.get('/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notifications.html'));
});

app.get('/videos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'videos.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Handle video uploads
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.redirect('/videos');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
