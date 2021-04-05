const Sequelize = require('sequelize');
const _changeRequestStatus = require("./changeRequestStatus");
const _users = require("./users");
const _assetList = require("./assetList");
const _softwareAssets = require("./softwareAssets");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const changeRequestStatus = _changeRequestStatus(sequelize, DataTypes);
    const users = _users(sequelize, DataTypes);
    const assetList = _assetList(sequelize, DataTypes);
    const softwareAssets = _softwareAssets(sequelize, DataTypes);

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
            allowNull: true,
            references: {
                model: assetList
            }
        },
        softwareAssetId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
