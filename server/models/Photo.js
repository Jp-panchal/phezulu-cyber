const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['company', 'webinar']]
    }
  }
}, {
  tableName: 'photos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Photo;
