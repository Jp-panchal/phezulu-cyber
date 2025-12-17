
const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// @route   GET api/partners
// @desc    Get all partners (Public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
