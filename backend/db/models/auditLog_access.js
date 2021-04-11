const Sequelize = require('sequelize');
const _users = require("./users");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);

    return sequelize.define('auditLog_access', {
        auditLog_access_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_access_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: userId
            }
        },
        auditLog_access_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'auditLog_access',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
