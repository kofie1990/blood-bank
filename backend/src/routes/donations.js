const router = require('express').Router();
let Donation = require('../models/Donation');

router.route('/').get((req, res) => {
  Donation.find()
    .then(donations => res.json(donations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const { donorId, date, amount, bloodType } = req.body;
  const newDonation = new Donation({ donorId, date, amount, bloodType });

  newDonation.save()
    .then(() => res.json('Donation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Donation.findById(req.params.id)
    .then(donation => {
      donation.donorId = req.body.donorId;
      donation.date = req.body.date;
      donation.amount = req.body.amount;
      donation.bloodType = req.body.bloodType;

      donation.save()
        .then(() => res.json('Donation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Donation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Donation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;