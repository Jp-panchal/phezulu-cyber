
const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');
const seedData = require('../data/insights');

// @route   GET api/insights
// @desc    Get latest insights
// @access  Public
router.get('/', async (req, res) => {
  try {
    let insights = await Insight.findAll({ order: [['created_at', 'DESC']] });
    
    // If empty, seed with fallback data
    if (insights.length === 0) {
      console.log('Seeding insights...');
      // Prepare seed data with slug field
      const preparedData = seedData.map(item => ({
        slug: item.id, // Use id as slug
        title: item.title,
        category: item.category,
        date: item.date,
        excerpt: item.excerpt,
        content: item.content || [item.excerpt],
        image: item.image || '',
        link: item.link || '#',
        is_featured: item.isFeatured || false
      }));
      
      insights = await Insight.bulkCreate(preparedData);
    }
    
    // Format response: map slug to id for frontend
    const formatted = insights.map(i => ({
      ...i.toJSON(),
      id: i.slug,
      _id: i.id,
      isFeatured: i.is_featured
    }));
    
    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.json(seedData); // Fallback
  }
});

// @route   GET api/insights/:slug
// @desc    Get single insight by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const insight = await Insight.findOne({ where: { slug: req.params.slug } });
    
    if (!insight) {
      return res.status(404).json({ msg: 'Insight not found' });
    }
    
    // Format response
    const formatted = {
      ...insight.toJSON(),
      id: insight.slug,
      _id: insight.id,
      isFeatured: insight.is_featured
    };
    
    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
