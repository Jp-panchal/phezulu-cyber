const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit a new contact inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    const newContact = new Contact({
      name,
      email,
      company,
      message
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    console.error('Contact submission error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;