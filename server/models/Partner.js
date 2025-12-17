
const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String }, // Optional: if you want images instead of text later
  category: { type: String, default: 'General' } // e.g., 'Cloud', 'Security'
});

module.exports = mongoose.model('Partner', PartnerSchema);
