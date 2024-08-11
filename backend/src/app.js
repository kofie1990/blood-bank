const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db'); // Ensure this path is correct
const authRoutes = require('./routes/auth'); // Ensure this path is correct

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', authRoutes); // Use the auth routes

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
connectDB();

module.exports = app;