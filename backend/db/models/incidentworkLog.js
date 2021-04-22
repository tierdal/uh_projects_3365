const Sequelize = require('sequelize');
const _incidentLog = require("./incidentLog");
const _users = require("./users");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const incidentLog = _incidentLog(sequelize, DataTypes);

    return sequelize.define('workLog', {
        incidentworkLog_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        incidentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: incidentLog
                //key: ticket_id
            }
        },
        incidentworkLog_time: {
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
        tableName: 'incidentworkLog',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'incidentworkLog_time',
        updatedAt: false,
        deletedAt: false
    });
};
