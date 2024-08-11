const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor'); // Adjust the path as necessary

// @route   POST /api/donors
// @desc    Add a new donor
// @access  Public (you might want to make this private in a real application)
router.post('/', async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    const donor = await newDonor.save();
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add other routes (GET, PUT, DELETE) as necessary

module.exports = router;