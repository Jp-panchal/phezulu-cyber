const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Webinar', 'Blog', 'Report'
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  link: { type: String, default: '#' },
  isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Insight', InsightSchema);