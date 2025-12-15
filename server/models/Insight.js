
const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Slug-like ID for routing
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Webinar', 'Blog', 'Report'
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: [{ type: String }], // Array of paragraphs
  image: { type: String },     // URL for header image
  link: { type: String, default: '#' },
  isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Insight', InsightSchema);
