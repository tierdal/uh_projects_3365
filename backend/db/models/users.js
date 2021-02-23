const Sequelize = require('sequelize');
const _departments = require("./departments");
const _roles = require("./roles");
const _statuses = require("./statuses");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

  const departments = _departments(sequelize, DataTypes);
  const roles = _roles(sequelize, DataTypes);
  const statuses = _statuses(sequelize, DataTypes);

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
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: departments,
        //key: 'department_id',
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: roles,
      }
    },
    is_approver: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: statuses,
      }
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
