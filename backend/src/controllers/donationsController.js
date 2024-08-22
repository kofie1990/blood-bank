const Donation = require('../models/Donation');

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const { donorId, date, amount, bloodType, donor } = req.body; // Include donor in destructuring

    if (!donor) {
      return res.status(400).json({ message: 'Donor is required' });
    }

    const newDonation = new Donation({
      donorId,
      date,
      amount,
      bloodType,
      donor // Add donor to the newDonation object
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { donorId, date, amount, bloodType } = req.body;

    // Validate request body
    if (!donorId || !date || !amount || !bloodType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      { donorId, date, amount, bloodType },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(updatedDonation);
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};