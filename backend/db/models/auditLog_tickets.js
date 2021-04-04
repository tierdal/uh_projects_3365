const Sequelize = require('sequelize');
const _users = require("./users");
const _ticketLog = require("./ticketLog");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const ticketLog = _ticketLog(sequelize, DataTypes);

    return sequelize.define('auditLog_tickets', {
        auditLog_tickets_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_tickets_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        auditLog_tickets_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auditLog_tickets_ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ticketLog
            }
        }
    }, {
        sequelize,
        tableName: 'auditLog_tickets',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
