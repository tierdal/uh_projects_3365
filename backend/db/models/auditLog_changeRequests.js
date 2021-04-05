const Sequelize = require('sequelize');
const _users = require("./users");
const _changeRequests = require("./changeRequests");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const changeRequests = _changeRequests(sequelize, DataTypes);

    return sequelize.define('auditLog_changeRequests', {
        auditLog_changeRequests_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_changeRequests_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        auditLog_changeRequests_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auditLog_changeRequests_requestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: changeRequests
            }
        }
    }, {
        sequelize,
        tableName: 'auditLog_changeRequests',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
