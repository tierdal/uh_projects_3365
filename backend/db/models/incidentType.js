const Sequelize = require('sequelize');
const _teams = require("./teams");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const teams = _teams(sequelize, DataTypes);

    return sequelize.define('incidentType', {
        incidentType_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        incidentType_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        incidentType_responsible: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: teams
                //key: team_id
            }
        }
    }, {
        sequelize,
        tableName: 'incidentType',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
