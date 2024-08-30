const express = require('express');
const router = express.Router();
const bloodSupplyController = require('../controllers/bloodSupplyController');

// Get all blood supplies
router.get('/', bloodSupplyController.getBloodSupply);

// Add a new blood supply
router.post('/', bloodSupplyController.createBloodSupply);

// Update a blood supply
router.put('/:id', bloodSupplyController.updateBloodSupply);

// Delete a blood supply
router.delete('/:id', bloodSupplyController.deleteAllBloodSupply);

module.exports = router;