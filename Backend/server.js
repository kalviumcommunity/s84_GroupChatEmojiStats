require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const emojiRoutes = require('./emojiroutes'); // Replace with your actual routes file
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://s84-group-chat-emoji-stats.netlify.app/'], // Update with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });

// Base route
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to GroupChatEmojiStats API!</h1>`);
});

// Ping route
app.get('/ping', (req, res) => {
    res.send('Pong!');
});

// Use the routes from emojiroutes.js
app.use('/api', emojiRoutes);
