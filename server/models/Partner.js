const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  logo_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  logo_file: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Client'
  }
}, {
  tableName: 'partners',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  validate: {
    hasLogo() {
      if (!this.logo_url && !this.logo_file) {
        throw new Error('Either logo_url or logo_file must be provided');
      }
    }
  }
});

module.exports = Partner;