const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');

// POST route to create a new donation
router.post('/', donationsController.createDonation);

// GET route to fetch all donations
router.get('/', donationsController.getDonations);

// PUT route to update a donation by ID
router.put('/:id', donationsController.updateDonation);

// DELETE route to delete a donation by ID
router.delete('/:id', donationsController.deleteDonation);

module.exports = router;