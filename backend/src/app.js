const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const donorsRouter = require('./routes/donors');
const donationsRouter = require('./routes/donations');
const bloodSupplyRouter = require('./routes/bloodSupply');
const usersRouter = require('./routes/users');

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

app.use('/api/users', usersRouter);
app.use('/api/donors', donorsRouter);
app.use('/api/donations', donationsRouter);
app.use('/api/blood-supply', bloodSupplyRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred. Please try again.' });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;