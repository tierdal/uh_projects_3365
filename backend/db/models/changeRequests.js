const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('changeRequests', {
        changeRequest_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        changeRequest_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        changeRequest_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        changeRequestTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: changeRequestStatus
            }
        },
        changeRequest_owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        hardwareAssetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: assetList
            }
        },
        softwareAssetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            referenecs: {
                model: softwareAssets
            }
        },
        changeRequest_approver: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        changeRequestStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: changeRequestStatus
            }
        },
    }, {
        sequelize,
        tableName: 'changeRequests',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false
    });
};
