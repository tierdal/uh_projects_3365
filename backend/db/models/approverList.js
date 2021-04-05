const Sequelize = require('sequelize');
const _users = require("./users");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);

    return sequelize.define('approverList', {
        user_getsapproved: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: 'user_id'
            }
        },
        user_approver: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: 'user_id'
            }
        }
    }, {
        sequelize,
        tableName: 'approverList',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
