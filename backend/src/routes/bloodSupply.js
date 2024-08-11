const router = require('express').Router();
let BloodSupply = require('../models/BloodSupply');

router.route('/').get((req, res) => {
  BloodSupply.find()
    .then(supplies => res.json(supplies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { bloodType, quantity } = req.body;
  const newSupply = new BloodSupply({ bloodType, quantity });

  newSupply.save()
    .then(() => res.json('Blood supply added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  BloodSupply.findById(req.params.id)
    .then(supply => {
      supply.bloodType = req.body.bloodType;
      supply.quantity = req.body.quantity;

      supply.save()
        .then(() => res.json('Blood supply updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  BloodSupply.findByIdAndDelete(req.params.id)
    .then(() => res.json('Blood supply deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;