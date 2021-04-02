const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('teams', {
        team_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'teams',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
