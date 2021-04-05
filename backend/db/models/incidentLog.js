const Sequelize = require('sequelize');
const _incidentType = require("./incidentType");
const _incidentUrgency = require("./incidentUrgency");
const _users = require("./users");
const _locations = require("./locations");
const _incidentStatus = require("./incidentStatus");
const _teams = require("./teams");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const incidentType = _incidentType(sequelize, DataTypes);
    const incidentUrgency = _incidentUrgency(sequelize, DataTypes);
    const users = _users(sequelize, DataTypes);
    const locations = _locations(sequelize, DataTypes);
    const incidentStatus = _incidentStatus(sequelize, DataTypes);
    const teams = _teams(sequelize, DataTypes);

    return sequelize.define('incidentLog', {
        incident_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        incident_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        incident_typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: incidentType
                //key: incidentType_id
            }
        },
        incident_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        incidentUrgencyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: incidentUrgency
                //key: incidentUrgencyId
            }
        },
        incident_createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: users
                //key: user_id
            }
        },
        incident_assignedUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        incident_location: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: locations
                //key: location_id
            }

        },
        incidentStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: incidentStatus
                //key: incidentStatus_id
            }
        },
        incident_assignedTeam: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: teams
                //key: team_id
            }
        }

    }, {
        sequelize,
        tableName: 'incidentLog',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false,
    });
};
