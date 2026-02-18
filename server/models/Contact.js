const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  service: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone_country_code: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'contacts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Contact;