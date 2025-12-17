const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const auth = require('../middleware/auth');

// @route   GET api/photos
// @desc    Get all photos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.json(photos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/photos
// @desc    Add a photo
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, imageUrl, category } = req.body;

    try {
        const newPhoto = new Photo({
            title,
            imageUrl,
            category
        });

        const photo = await newPhoto.save();
        res.json(photo);
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
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({ msg: 'Photo not found' });
        }

        await photo.deleteOne();
        res.json({ msg: 'Photo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
