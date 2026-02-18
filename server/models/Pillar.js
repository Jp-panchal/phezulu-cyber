const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pillar = sequelize.define('Pillar', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  subtitle: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'from-crimson/20 to-rose-500/5'
  },
  icon_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  services: {
    type: DataTypes.TEXT, // Store JSON array as string
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('services');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('services', JSON.stringify(value));
    }
  },
  details: {
    type: DataTypes.TEXT, // Store JSON array as string
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('details');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('details', JSON.stringify(value));
    }
  }
}, {
  tableName: 'pillars',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Pillar;