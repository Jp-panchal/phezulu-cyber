const sequelize = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Connected to Azure SQL Database');

    // Sync tables
    await sequelize.sync();
    console.log('Tables synchronized');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await User.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log(' Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\n IMPORTANT: Change this password in production!');

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();