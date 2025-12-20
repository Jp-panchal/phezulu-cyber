const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Insight = sequelize.define('Insight', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT, // Store JSON array as string
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('content');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('content', JSON.stringify(value));
    }
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: '#'
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'insights',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Insight;