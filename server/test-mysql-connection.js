/**
 * MySQL Connection Test
 * 
 * This script tests the MySQL database connection using the same
 * configuration as the main application.
 * 
 * Usage: node test-mysql-connection.js
 */

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance with MySQL configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false
  }
);

const testConnection = async () => {
  console.log('\n🔍 Testing MySQL Connection...\n');
  console.log('Configuration:');
  console.log(`  Host: ${process.env.DB_HOST || 'NOT SET'}`);
  console.log(`  Port: ${process.env.DB_PORT || '3306 (default)'}`);
  console.log(`  Database: ${process.env.DB_NAME || 'NOT SET'}`);
  console.log(`  User: ${process.env.DB_USER || 'NOT SET'}`);
  console.log(`  Password: ${process.env.DB_PASSWORD ? '***' : 'NOT SET'}\n`);

  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connection Successful!');
    console.log('✅ Database is ready to use.\n');
    
    // Try to list tables
    const [results] = await sequelize.query('SHOW TABLES');
    console.log(`📊 Found ${results.length} table(s) in database:`);
    results.forEach(row => {
      const tableName = Object.values(row)[0];
      console.log(`   - ${tableName}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Failed!\n');
    console.error('Error Details:', error.message);
    
    if (error.code) {
      console.error(`Error Code: ${error.code}\n`);
      
      // Provide helpful error messages
      switch (error.code) {
        case 'ECONNREFUSED':
          console.error('💡 Tip: MySQL server is not running or refusing connections.');
          console.error('   - Check if MySQL is running');
          console.error('   - Verify the host and port are correct\n');
          break;
        case 'ER_ACCESS_DENIED_ERROR':
          console.error('💡 Tip: Access denied for the provided credentials.');
          console.error('   - Check DB_USER and DB_PASSWORD in .env');
          console.error('   - Verify the user has proper permissions\n');
          break;
        case 'ER_BAD_DB_ERROR':
          console.error('💡 Tip: Database does not exist.');
          console.error('   - Create the database first');
          console.error('   - Verify DB_NAME in .env is correct\n');
          break;
        case 'ENOTFOUND':
          console.error('💡 Tip: Cannot resolve the database host.');
          console.error('   - Check DB_HOST in .env');
          console.error('   - Verify network connectivity\n');
          break;
        default:
          console.error('💡 Tip: Check all environment variables in .env file\n');
      }
    }
    
    process.exit(1);
  }
};

testConnection();
