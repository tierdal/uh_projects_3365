const Sequelize = require('sequelize');
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('requestStatus', {
        requestStatus_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        requestStatus_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'requestStatus',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
