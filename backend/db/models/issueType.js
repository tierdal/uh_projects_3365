const Sequelize = require('sequelize');
const _issueCategory = require("./issueCategory");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

  const issueCategory = _issueCategory(sequelize, DataTypes);
  
  return sequelize.define('issueType', {
    issueType_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    issueType_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issueType_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issueCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: issueCategory
      }
    }
  }, {
    sequelize,
    tableName: 'issueType',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
};
