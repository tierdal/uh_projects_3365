const Sequelize = require('sequelize');
const _users = require("./users");
const _incidentLog = require("./incidentLog");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const incidentLog = _incidentLog(sequelize, DataTypes);

    return sequelize.define('incidentResponseLog', {
        incidentResponseLog_id: {
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
                //key: incident_id
            }
        },
        incidentResponseLog_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        incidentResponseLog_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        incidentResponseLog_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'incidentResponseLog',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'incidentResponseLog_time',
        updatedAt: false,
        deletedAt: false
    });
};
