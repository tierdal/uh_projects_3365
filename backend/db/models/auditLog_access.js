const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('auditLog_access', {
        auditLog_access_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_access_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: userId
            }
        },
        auditLog_access_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'auditLog_access',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
