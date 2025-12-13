const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');
const seedData = require('../data/insights');

// @route   GET api/insights
// @desc    Get latest insights
// @access  Public
router.get('/', async (req, res) => {
  try {
    let insights = await Insight.find().limit(3);
    
    // Seed if empty
    if (insights.length === 0) {
      insights = await Insight.insertMany(seedData);
    }
    
    res.json(insights);
  } catch (err) {
    console.error(err.message);
    res.json(seedData); // Fallback
  }
});

module.exports = router;