const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String, // 'company', 'webinar'
        required: true,
        enum: ['company', 'webinar']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Photo', PhotoSchema);
