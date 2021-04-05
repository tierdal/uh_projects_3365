const Sequelize = require('sequelize');
const _users = require("./users");
const _ticketLog = require("./ticketLog");
const _requestStatus = require("./requestStatus");
const _shippingMethods = require("./shippingMethods");
const _locations = require("./locations");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const ticketLog = _ticketLog(sequelize, DataTypes);
    const requestStatus = _requestStatus(sequelize, DataTypes);
    const shippingMethods = _shippingMethods(sequelize, DataTypes);
    const locations = _locations(sequelize, DataTypes);

    return sequelize.define('tasklist', {
        task_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        task_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        task_owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ticketLog
                //key: ticket_id
            }
        },
        requestStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: requestStatus
                //key: requestStatus_id
            }
        },
        needsApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        task_approver: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: users
                //key: user_id
            }
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        needsShipping: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        shippingMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: shippingMethods
                //key: shippingMethod_id
            }
        },
        shippingLocationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: locations
                //key: location_id
            }
        },
        shippingStatusId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'taskList',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false
    });
};
