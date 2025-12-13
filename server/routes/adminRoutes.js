
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Employee = require('../models/Employee');
const Partner = require('../models/Partner');
const Pillar = require('../models/Pillar');
const Insight = require('../models/Insight');

// --- EMPLOYEES ---
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/employees', auth, async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const employee = await newEmployee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/employees/:id', auth, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// --- PARTNERS ---
router.get('/partners', async (req, res) => {
    try {
      const partners = await Partner.find();
      res.json(partners);
    } catch (err) {
      res.status(500).send('Server Error');
    }
});
  
router.post('/partners', auth, async (req, res) => {
    try {
      const newPartner = new Partner(req.body);
      const partner = await newPartner.save();
      res.json(partner);
    } catch (err) {
      res.status(500).send('Server Error');
    }
});

router.delete('/partners/:id', auth, async (req, res) => {
    try {
        await Partner.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Partner removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- INSIGHTS ---
router.post('/insights', auth, async (req, res) => {
    try {
      const newInsight = new Insight(req.body);
      const insight = await newInsight.save();
      res.json(insight);
    } catch (err) {
      res.status(500).send('Server Error');
    }
});

router.delete('/insights/:id', auth, async (req, res) => {
    try {
        await Insight.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Insight removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- PILLARS (Services) ---
// Update a Pillar (often used to update the 'details' array inside it)
router.put('/pillars/:id', auth, async (req, res) => {
    try {
        const pillar = await Pillar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pillar);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
