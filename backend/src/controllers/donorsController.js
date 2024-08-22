const Donor = require('../models/Donor');

exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDonor = async (req, res) => {
  const { name, bloodType, contact } = req.body;

  const donor = new Donor({
    name,
    bloodType,
    contact,
  });

  try {
    await donor.save();
    res.status(201).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDonor = async (req, res) => {
  const { id } = req.params;
  const { name, bloodType, contact } = req.body;

  try {
    const donor = await Donor.findById(id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    donor.name = name;
    donor.bloodType = bloodType;
    donor.contact = contact;
    await donor.save();

    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDonor = async (req, res) => {
  const { id } = req.params;

  try {
    const donor = await Donor.findByIdAndDelete(id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.json({ message: 'Donor deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};