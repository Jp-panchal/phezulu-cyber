const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  diagram_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  diagram_file: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  features: {
    type: DataTypes.TEXT, // Store JSON array as string
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('features');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('features', JSON.stringify(value));
    }
  },
  benefits: {
    type: DataTypes.TEXT, // Store JSON array as string
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('benefits');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('benefits', JSON.stringify(value));
    }
  }
}, {
  tableName: 'services',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Service;
