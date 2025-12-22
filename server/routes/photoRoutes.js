const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const auth = require('../middleware/auth');

// @route   GET api/photos
// @desc    Get all photos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.findAll({ order: [['created_at', 'DESC']] });
        const formatted = photos.map(p => ({ 
            ...p.toJSON(), 
            _id: p.id,
            imageUrl: p.url
        }));
        res.json(formatted);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/photos
// @desc    Add a photo
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, imageUrl, url, category } = req.body;

    try {
        const photo = await Photo.create({
            title,
            url: url || imageUrl, // Accept either field name
            category
        });
        res.json({ 
            ...photo.toJSON(), 
            _id: photo.id,
            imageUrl: photo.url
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/photos/:id
// @desc    Delete a photo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const photo = await Photo.findByPk(req.params.id);

        if (!photo) {
            return res.status(404).json({ msg: 'Photo not found' });
        }

        await photo.destroy();
        res.json({ msg: 'Photo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
