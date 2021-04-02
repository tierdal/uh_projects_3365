const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('requestStatus', {
        resolved_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        resolved_name: {
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
