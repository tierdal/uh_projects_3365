const Sequelize = require('sequelize');
const _users = require("./users");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);

    return sequelize.define('auditLog_appovals', {
        auditLog_approvals_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_approvals_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        auditLog_approvals_action: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'auditLog_approvals',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
