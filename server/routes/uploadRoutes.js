const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});

// @route   POST api/upload
// @desc    Upload an image
// @access  Public (Protected by implementation in frontend)
router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    // Return the URL to access the file
    // Assumes server serves 'uploads' statically
    const protocol = req.protocol;
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    res.json({ url: fullUrl });
  } else {
    res.status(400).send('No file uploaded');
  }
});

module.exports = router;