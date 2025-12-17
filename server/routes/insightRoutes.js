
const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');
const seedData = require('../data/insights');

// @route   GET api/insights
// @desc    Get latest insights
// @access  Public
router.get('/', async (req, res) => {
  try {
    let insights = await Insight.find();
    
    // Check if any insight is missing an ID or CONTENT (indicates legacy data)
    const hasInvalidData = insights.some(i => !i.id || !i.content || i.content.length === 0);
    
    // If empty or has bad data, re-seed
    if (insights.length === 0 || hasInvalidData) {
      if (hasInvalidData) {
         console.log('Detected legacy data (missing ID or Content). Clearing insights collection...');
         await Insight.deleteMany({}); // Clear bad data
      }
      console.log('Seeding insights...');
      insights = await Insight.insertMany(seedData);
    }
    
    res.json(insights);
  } catch (err) {
    console.error(err.message);
    res.json(seedData); // Fallback
  }
});

module.exports = router;
