
const mongoose = require('mongoose');

const ServiceDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: [{ type: String }], // Array of strings for paragraphs
  features: [{ type: String }],        // Array of bullet points
  benefits: [{ type: String }],        // Array of bullet points
  diagramUrl: { type: String }         // URL for specific service diagram/image
});

const PillarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    default: "from-crimson/20 to-rose-500/5"
  },
  iconName: {
    type: String,
    required: true
  },
  services: [{
    type: String
  }],
  details: [ServiceDetailSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pillar', PillarSchema);