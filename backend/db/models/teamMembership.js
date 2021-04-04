const Sequelize = require('sequelize');
const _users = require("./users");
const _teams = require("./teams");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const users = _users(sequelize, DataTypes);
    const teams = _teams(sequelize, DataTypes);

    return sequelize.define('teamMembership', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: teams
                //key: team_id
            }
        }
    }, {
        sequelize,
        tableName: 'teamMembership',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
