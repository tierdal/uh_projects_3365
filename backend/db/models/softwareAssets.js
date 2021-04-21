const Sequelize = require('sequelize');
const _softwareStatus = require("./softwareStatus");
const _vendors = require("./vendors");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const softwareStatus = _softwareStatus(sequelize, DataTypes);
    const vendors = _vendors(sequelize, DataTypes);

    return sequelize.define('softwareAssets', {
        software_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        software_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        software_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        softwareStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: softwareStatus
                //key: softwareStatus_id
            }
        },
        vendorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:vendors
                //key: vendor_id
            }
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        software_notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'softwareAssets',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false
    });
};
