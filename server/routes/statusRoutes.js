const express = require('express');
const router = express.Router();

// @route   GET api/status
// @desc    Get real-time system status
// @access  Public
router.get('/', (req, res) => {
  // Simulate dynamic status check
  // In a real app, this would check database, redis, or external APIs
  const statuses = [
    { label: "System Operational", color: "green", code: "SECURE" },
    { label: "Threat Analysis Active", color: "blue", code: "SCANNING" },
    { label: "Firewall Optimized", color: "green", code: "SECURE" }
  ];
  
  // Randomly select a status for demo purposes, but biased towards secure
  const randomStatus = Math.random() > 0.7 ? statuses[1] : statuses[0];
  
  res.json(randomStatus);
});

module.exports = router;