const BloodSupply = require('../models/BloodSupply');

exports.getBloodSupply = async (req, res) => {
  try {
    const bloodSupply = await BloodSupply.find();
    res.json(bloodSupply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBloodSupply = async (req, res) => {
  const { bloodType, quantity } = req.body;

  const bloodSupply = new BloodSupply({
    bloodType,
    quantity,
  });

  try {
    await bloodSupply.save();
    res.status(201).json(bloodSupply);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBloodSupply = async (req, res) => {
  const { id } = req.params;
  const { bloodType, quantity } = req.body;

  try {
    const bloodSupply = await BloodSupply.findById(id);
    if (!bloodSupply) {
      return res.status(404).json({ message: 'Blood supply not found' });
    }

    bloodSupply.bloodType = bloodType;
    bloodSupply.quantity = quantity;
    await bloodSupply.save();

    res.json(bloodSupply);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBloodSupply = async (req, res) => {
  const { id } = req.params;

  try {
    const bloodSupply = await BloodSupply.findById(id);
    if (!bloodSupply) {
      return res.status(404).json({ message: 'Blood supply not found' });
    }

    await bloodSupply.remove();
    res.json({ message: 'Blood supply deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllBloodSupply = async (req, res) => {
  try {
    await BloodSupply.deleteMany({});
    res.json({ message: 'All blood supply data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};