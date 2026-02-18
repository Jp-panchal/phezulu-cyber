
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const path = require('path');
const pillarRoutes = require('./routes/pillarRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statusRoutes = require('./routes/statusRoutes');
const insightRoutes = require('./routes/insightRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const photoRoutes = require('./routes/photoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Database environment validation
if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER) {
  console.warn('Incomplete MySQL configuration. Please set DB_HOST, DB_NAME, DB_USER environment variables.');
}

// CORS Configuration for Hostinger Subdomain Architecture
// Frontend: domain.com (static files in public_html)
// Backend: api.domain.com (Node.js on subdomain)
const corsOptions = {
  origin: function (origin, callback) {
    // Allowed origins - add your frontend domain here when deployed to Hostinger
    const allowedOrigins = [
      'http://localhost:5173',  // Local development (Vite)
      'http://localhost:3000',  // Alternative local dev port
      process.env.FRONTEND_URL  // Production frontend URL (e.g., https://yourdomain.com)
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // Keep limit for flexibility

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/pillars', pillarRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/photos', photoRoutes);

// Database Connection
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected');
    
    // Sync all models (creates tables if they don't exist)
    await sequelize.sync({ alter: false }); // Use { alter: true } in dev to auto-update schema
    console.log('Database tables synchronized');
  } catch (err) {
    console.error('Database Connection Error:', err);
    console.log('Running in offline mode with static responses.');
  }
};

connectDatabase();

// --- SERVE FRONTEND (Production/Preview) ---
// This allows the server to host the React app on the same port (5000)
// Resolves ngrok CORS/Multi-port instability.
// NOTE: removed unconditional `|| true` so static serving only happens in real production/preview.
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preview') {
  // Point to the client dist folder (assuming it's a sibling folder)
  const clientBuildPath = path.join(__dirname, '../client/dist');

  app.use(express.static(clientBuildPath));

  // Catch-all handler for React Router (Single Page App)
  // UPDATED: Using RegExp (/.*/) instead of '*' string to support Express 5 / newer path-to-regexp
  app.get(/.*/, (req, res) => {
    // Ensure we don't catch API routes that might have been missed above
    if (!req.path.startsWith('/api')) {
      const indexPath = path.join(clientBuildPath, 'index.html');
      // If index.html exists, serve it, otherwise send API running msg
      const fs = require('fs');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.send('Phezulu Cyber API is running. (Frontend build not found in ../client/dist)');
      }
    } else {
      res.status(404).json({ msg: 'API Route Not Found' });
    }
  });
} else {
  // Base Route for Dev API only
  app.get('/', (req, res) => {
    res.send('Phezulu Cyber API is running');
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
