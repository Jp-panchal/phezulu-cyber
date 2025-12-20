
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Employee = require('../models/Employee');
const Partner = require('../models/Partner');
const Pillar = require('../models/Pillar');
const Insight = require('../models/Insight');
const Service = require('../models/Service');
const Photo = require('../models/Photo');

// --- EMPLOYEES ---
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll({ order: [['created_at', 'DESC']] });
    // Map to include _id for frontend compatibility
    const formatted = employees.map(e => ({ ...e.toJSON(), _id: e.id }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/employees', auth, async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json({ ...employee.toJSON(), _id: employee.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/employees/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    
    await employee.update(req.body);
    res.json({ ...employee.toJSON(), _id: employee.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/employees/:id', auth, async (req, res) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- PARTNERS ---
router.get('/partners', async (req, res) => {
  try {
    const partners = await Partner.findAll({ order: [['created_at', 'DESC']] });
    // Map company_name to name for frontend and include _id
    const formatted = partners.map(p => ({
      ...p.toJSON(),
      _id: p.id,
      name: p.company_name,
      logoUrl: p.logo_url || p.logo_file
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/partners', auth, async (req, res) => {
  try {
    // Accept name from frontend, store as company_name
    const data = { ...req.body };
    if (data.name && !data.company_name) {
      data.company_name = data.name;
      delete data.name;
    }
    if (data.logoUrl && !data.logo_url) {
      data.logo_url = data.logoUrl;
      delete data.logoUrl;
    }
    
    const partner = await Partner.create(data);
    res.json({ 
      ...partner.toJSON(), 
      _id: partner.id,
      name: partner.company_name,
      logoUrl: partner.logo_url || partner.logo_file
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/partners/:id', auth, async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) return res.status(404).json({ msg: 'Partner not found' });
    
    // Accept name from frontend, store as company_name
    const data = { ...req.body };
    if (data.name && !data.company_name) {
      data.company_name = data.name;
      delete data.name;
    }
    if (data.logoUrl && !data.logo_url) {
      data.logo_url = data.logoUrl;
      delete data.logoUrl;
    }
    
    await partner.update(data);
    res.json({ 
      ...partner.toJSON(), 
      _id: partner.id,
      name: partner.company_name,
      logoUrl: partner.logo_url || partner.logo_file
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/partners/:id', auth, async (req, res) => {
  try {
    await Partner.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Partner removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- INSIGHTS ---
router.post('/insights', auth, async (req, res) => {
  try {
    // Generate slug from title if not provided
    const data = { ...req.body };
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    // Ensure content is set (can be same as excerpt if not provided)
    if (!data.content && data.excerpt) {
      data.content = [data.excerpt];
    }
    
    const insight = await Insight.create(data);
    res.json({ ...insight.toJSON(), _id: insight.id, id: insight.slug });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/insights/:id', auth, async (req, res) => {
  try {
    const insight = await Insight.findByPk(req.params.id);
    if (!insight) return res.status(404).json({ msg: 'Insight not found' });
    
    await insight.update(req.body);
    res.json({ ...insight.toJSON(), _id: insight.id, id: insight.slug });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/insights/:id', auth, async (req, res) => {
  try {
    await Insight.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Insight removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- PHOTOS ---
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.findAll({ order: [['created_at', 'DESC']] });
    const formatted = photos.map(p => ({ 
      ...p.toJSON(), 
      _id: p.id,
      imageUrl: p.url
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/photos', auth, async (req, res) => {
  try {
    // Accept imageUrl from frontend, map to url
    const data = { ...req.body };
    if (data.imageUrl && !data.url) {
      data.url = data.imageUrl;
      delete data.imageUrl;
    }
    
    const photo = await Photo.create(data);
    res.json({ 
      ...photo.toJSON(), 
      _id: photo.id,
      imageUrl: photo.url
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/photos/:id', auth, async (req, res) => {
  try {
    await Photo.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Photo removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- SERVICES ---
router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['category', 'ASC'], ['name', 'ASC']] });
    const formatted = services.map(s => ({
      ...s.toJSON(),
      _id: s.id,
      diagramUrl: s.diagram_url || s.diagram_file
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/services', auth, async (req, res) => {
  try {
    // Accept diagramUrl from frontend, map to diagram_url
    const data = { ...req.body };
    if (data.diagramUrl && !data.diagram_url) {
      data.diagram_url = data.diagramUrl;
      delete data.diagramUrl;
    }
    if (data.pillarId && !data.category) {
      // pillarId might be title or id, use as category
      data.category = data.pillarId;
    }
    
    const service = await Service.create(data);
    res.json({
      ...service.toJSON(),
      _id: service.id,
      diagramUrl: service.diagram_url || service.diagram_file
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT /services/:id (simple ID-based update)
router.put('/services/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });
    
    // Accept diagramUrl from frontend, map to diagram_url
    const data = { ...req.body };
    if (data.diagramUrl && !data.diagram_url) {
      data.diagram_url = data.diagramUrl;
      delete data.diagramUrl;
    }
    if (data.pillarId && !data.category) {
      data.category = data.pillarId;
    }
    
    await service.update(data);
    res.json({
      ...service.toJSON(),
      _id: service.id,
      diagramUrl: service.diagram_url || service.diagram_file
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT /services/:pillarId/:name (compound format for ServiceManager)
router.put('/services/:pillarId/:name', auth, async (req, res) => {
  try {
    const pillarId = req.params.pillarId;
    const name = decodeURIComponent(req.params.name);
    const service = await Service.findOne({ where: { category: pillarId, name: name } });
    
    if (!service) return res.status(404).json({ msg: 'Service not found' });
    
    // Accept diagramUrl from frontend, map to diagram_url
    const data = { ...req.body };
    if (data.diagramUrl && !data.diagram_url) {
      data.diagram_url = data.diagramUrl;
      delete data.diagramUrl;
    }
    if (data.pillarId && !data.category) {
      data.category = data.pillarId;
    }
    
    await service.update(data);
    res.json({
      ...service.toJSON(),
      _id: service.id,
      diagramUrl: service.diagram_url || service.diagram_file
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE /services/:id (simple ID-based delete)
router.delete('/services/:id', auth, async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE /services/:pillarId/:name (compound format for ServiceManager)
router.delete('/services/:pillarId/:name', auth, async (req, res) => {
  try {
    const pillarId = req.params.pillarId;
    const name = decodeURIComponent(req.params.name);
    await Service.destroy({ where: { category: pillarId, name: name } });
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- PILLARS (Services) ---
// Update a Pillar (often used to update the 'details' array inside it)
router.put('/pillars/:id', auth, async (req, res) => {
  try {
    const pillar = await Pillar.findByPk(req.params.id);
    if (!pillar) return res.status(404).json({ msg: 'Pillar not found' });
    
    await pillar.update(req.body);
    res.json({ ...pillar.toJSON(), iconName: pillar.icon_name });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
