
const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// @route   GET api/partners
// @desc    Get all partners (Public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.findAll({ order: [['created_at', 'DESC']] });
    // Map company_name to name for frontend compatibility
    const formatted = partners.map(p => ({
      ...p.toJSON(),
      _id: p.id,
      name: p.company_name,
      logoUrl: p.logo_url || p.logo_file
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
