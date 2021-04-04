const Sequelize = require('sequelize');
const _users = require("./users");
const _locations = require("./locations");
const _assetList = require("./assetList");
const _softwareAssets = require("./softwareAssets");
const _requestStatus = require("./requestStatus");
const _issueType = require("./issueType");
const _prioritylist = require("./priorityList");
const _issueCategory = require("./issueCategory");
const _teams = require("./teams");
const _resolvedList = require("./resolvedList");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const locations =_locations(sequelize, DataTypes);
    const assetList = _assetList(sequelize, DataTypes);
    const softwareAssets = _softwareAssets(sequelize, DataTypes);
    const requestStatus = _requestStatus(sequelize, DataTypes);
    const issueType = _issueType(sequelize, DataTypes);
    const priorityList =_prioritylist(sequelize, DataTypes);
    const issueCategory = _issueCategory(sequelize, DataTypes);
    const teams = _teams(sequelize, DataTypes);
    const resolvedList = _resolvedList(sequelize, DataTypes);

    return sequelize.define('ticketLog', {
        ticket_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ticket_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ticket_description: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: locations
                //key: location_id
            }
        },
        assetId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: assetList
                //key: asset_id
            }
        },
        softwareId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: softwareAssets
                //key: software_id
            }
        },
        requestStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: requestStatus
                //key: requestStatus_id
            }
        },
        issueId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: issueType
                //key: issueType_id
            }
        },
        priorityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: priorityList
                //key: priority_id
            }
        },
        issueCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: issueCategory
                //key: issueCategory_id
            }
        },
        assigned_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: users
                //key: user_id
            }
        },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: teams
                //key: team_id
            }
        },
        is_resolved: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        resolvedId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: resolvedList
                //key: resolved_id
            }
        },
        resolution_notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'ticketLog',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false
    });
};
