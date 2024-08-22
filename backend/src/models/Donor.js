const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  contact: { type: String, required: true },
  lastDonationDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);