const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_approver: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__users__3213E83FFE16023F",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
