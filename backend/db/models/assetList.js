const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('assetList', {
        asset_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        asset_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        asset_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        serial_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        assetStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: assetStatus
                //key: 'assetStatus_id'
            }
        },
        assetTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: assetType
                //key: 'assetType_id'
            }
        },
        vendorId: {
            type: DataTypes.INTEGER,
            allowNull: false
            references: {
                model: vendors
                //key: 'vendor_id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
            references: {
                model: users
                //key: 'user_id'
            }
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        asset_notes: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'assetList',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false
    });
};
