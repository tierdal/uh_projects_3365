const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
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
    /*indexes: [
      {
        name: "",
        unique: true,
        fields: [
          { name: "" },
        ]
      },
    ]*/
  });
};
