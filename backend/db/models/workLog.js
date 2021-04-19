const Sequelize = require('sequelize');
const _ticketLog = require("./ticketLog");
const _users = require("./users");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const ticketLog = _ticketLog(sequelize, DataTypes);

    return sequelize.define('workLog', {
        workLog_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ticketLog
                //key: ticket_id
            }
        },
        workLog_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        workLog_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'workLog',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'workLog_time',
        updatedAt: false,
        deletedAt: false
    });
};
