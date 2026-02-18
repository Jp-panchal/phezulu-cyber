const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit a new contact inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, company, country, service, message, phone_country_code, phone } = req.body;

    // Basic validation
    if (!name || !email || !company || !country || !service || !message) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    const contact = await Contact.create({
      name,
      email,
      company,
      country,
      service,
      message,
      phone_country_code,
      phone
    });
    
    res.status(201).json(contact);
  } catch (err) {
    console.error('Contact submission error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;