
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  stats: [{
    label: { type: String },
    value: { type: String }
  }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
