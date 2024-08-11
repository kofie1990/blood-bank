const express = require('express');
const router = express.Router();
const { getDonors, addDonor, updateDonor, deleteDonor } = require('../controllers/donorController');
const { getDonations, addDonation } = require('../controllers/donationController');
const { getBloodSupply, updateBloodSupply, addBloodSupply } = require('../controllers/bloodSupplyController');

// Donor routes
router.get('/donors', getDonors);
router.post('/donors', addDonor);
router.put('/donors/:id', updateDonor);
router.delete('/donors/:id', deleteDonor);

// Donation routes
router.get('/donations', getDonations);
router.post('/donations', addDonation);

// Blood Supply routes
router.get('/blood-supply', getBloodSupply);
router.put('/blood-supply', updateBloodSupply);
router.post('/blood-supply', addBloodSupply);


module.exports = router;