const express = require('express');
const router = express.Router();
const donorsController = require('../controllers/donorsController');
const verifyToken = require('../middleware/verifyToken');

// Get all donors
router.get('/', donorsController.getDonors);

// Create a new donor
router.post('/', donorsController.createDonor);

// Update a donor
router.put('/:id', donorsController.updateDonor);

// Delete a donor
router.delete('/:id', donorsController.deleteDonor);

module.exports = router;