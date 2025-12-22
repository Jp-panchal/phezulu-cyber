const express = require('express');
const router = express.Router();
const Pillar = require('../models/Pillar');
const Service = require('../models/Service');
const seedData = require('../data/pillars');

// @route   GET api/pillars
// @desc    Get all service pillars
// @access  Public
router.get('/', async (req, res) => {
  try {
    let pillars = await Pillar.findAll({ raw: false });
    
    // If DB is empty, seed with fallback data
    if (pillars.length === 0) {
      console.log('Seeding pillars...');
      // Map seedData to Sequelize format
      const preparedData = seedData.map(p => ({
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        color: p.color,
        icon_name: p.iconName,
        services: p.services,
        details: p.details
      }));
      
      pillars = await Pillar.bulkCreate(preparedData);
    }
    
    // Get services from Service table and group by category
    const services = await Service.findAll({ raw: false });
    const servicesByCategory = services.reduce((acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push({
        name: service.name,
        description: service.description,
        fullDescription: [service.description],
        features: service.features,
        benefits: service.benefits,
        diagramUrl: service.diagram_url || service.diagram_file
      });
      return acc;
    }, {});
    
    // Format response: merge pillar details with services from Service table
    const formatted = pillars.map(p => {
      const pillarData = p.toJSON();
      const dynamicServices = servicesByCategory[p.title] || [];
      
      return {
        ...pillarData,
        _id: p.id,
        iconName: p.icon_name,
        // Combine stored details with dynamic services
        details: [...pillarData.details, ...dynamicServices]
      };
    });
    
    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    // Fallback to static data if DB fails
    res.json(seedData);
  }
});

module.exports = router;