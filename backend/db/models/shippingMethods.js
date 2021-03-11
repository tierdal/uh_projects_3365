const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shippingMethods', {
    shippingMethods_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shippingMethods_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shippingMethods',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
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
