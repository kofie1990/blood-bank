const mongoose = require('mongoose');

const BloodSupplySchema = new mongoose.Schema({
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BloodSupply', BloodSupplySchema);