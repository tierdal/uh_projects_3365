const Sequelize = require('sequelize');
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('roles', {
        role_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        role_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'roles',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    });
};
