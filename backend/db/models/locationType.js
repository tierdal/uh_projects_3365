const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('locationType', {
        locationType_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        locationType_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'locationType',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
