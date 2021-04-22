const Sequelize = require('sequelize');
const _softwareAssets = require("./softwareAssets");
const _users = require("./users");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const softwareAssets = _softwareAssets(sequelize, DataTypes);
    const users = _users(sequelize, DataTypes);

    return sequelize.define('licenseKeys', {
        license_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        softwareId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: softwareAssets
                //key: software_id
            }
        },
        license_key: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: users
                //key: user_id
            }
        }
    }, {
        sequelize,
        tableName: 'licenseKeys',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
