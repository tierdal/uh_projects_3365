const Sequelize = require('sequelize');
const _locations = require("./locations");
const _paymentTerms = require("./paymentTerms");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const locations = _locations(sequelize, DataTypes);
    const paymentTerms = _paymentTerms(sequelize, DataTypes);

    return sequelize.define('vendors', {
        vendor_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        vendor_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vendor_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vendor_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: locations
                //key: location_id
            }
        },
        vendor_notes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paymentTermId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: paymentTerms
                //key: paymentTerm_id
            }
        }
    }, {
        sequelize,
        tableName: 'vendors',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
