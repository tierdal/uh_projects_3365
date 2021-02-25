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
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    /*indexes: [
      {
        name: "PK__accountT__3213E83F1B5034D0",
        unique: true,
        fields: [
          { name: "department_id" },
        ]
      },
    ]*/
  });
};
