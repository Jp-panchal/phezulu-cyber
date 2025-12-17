require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/phezulu';
    
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    const username = 'admin';
    const password = 'password123'; // CHANGE THIS PASSWORD

    let user = await User.findOne({ username });
    if (user) {
      console.log('Admin user already exists');
      process.exit();
    }

    user = new User({ username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log('Admin user created successfully');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();