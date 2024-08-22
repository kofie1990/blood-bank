const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);