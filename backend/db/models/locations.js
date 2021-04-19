const Sequelize = require('sequelize');
const DataTypes = require("sequelize").DataTypes;
const _locationType = require("./locationType");

module.exports = function(sequelize, DataTypes) {

    const locationType = _locationType(sequelize, DataTypes);

    return sequelize.define('locations', {
        location_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locationTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: locationType
                //key: locationType_id
            }
        },
        location_street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_street2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_country: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'locations',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
