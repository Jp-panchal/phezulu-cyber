const express = require('express');
const router = express.Router();
const Pillar = require('../models/Pillar');
const seedData = require('../data/pillars');

// @route   GET api/pillars
// @desc    Get all service pillars
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Optimization: .lean() returns plain JavaScript objects instead of Mongoose Documents.
    // This is significantly faster for read-only operations.
    let pillars = await Pillar.find().lean();
    
    // If DB is empty, use seed data (auto-seeding for demo purposes)
    if (pillars.length === 0) {
      // Note: insertMany returns documents, so we don't need .lean() here as it's a one-time setup cost
      pillars = await Pillar.insertMany(seedData);
    }
    
    res.json(pillars);
  } catch (err) {
    console.error(err.message);
    // Fallback to static data if DB fails
    res.json(seedData);
  }
});

module.exports = router;