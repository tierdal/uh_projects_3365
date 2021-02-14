const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accountType', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UPDATED_AT: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'accountType',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__accountT__3213E83F1B5034D0",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
