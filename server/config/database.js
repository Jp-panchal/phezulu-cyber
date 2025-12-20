const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'phezulu',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_SERVER || 'localhost',
    port: process.env.DB_PORT || 1433,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true' || true, // Azure SQL requires encryption
        trustServerCertificate: false,
        enableArithAbort: true
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);

module.exports = sequelize;
