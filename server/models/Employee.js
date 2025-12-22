const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  achievement: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  speciality: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  linkedin: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'employees',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Employee;