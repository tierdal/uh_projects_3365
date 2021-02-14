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
      defaultValue: '2',
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: '2',
      allowNull: false
    },
    is_approver: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
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
    deletedAt: false
  });
};
