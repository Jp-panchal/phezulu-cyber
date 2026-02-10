const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.AZURE_SQL_DATABASE,
  process.env.AZURE_SQL_USER,
  process.env.AZURE_SQL_PASSWORD,
  {
    host: process.env.AZURE_SQL_SERVER,
    port: Number(process.env.AZURE_SQL_PORT) || 1433,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        enableArithAbort: true
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false // set true if you want SQL logs
  }
);
module.exports = sequelize;