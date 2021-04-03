const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('auditLog_changeRequests', {
        auditLog_chnageRequests_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_changeRequests_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        auditLog_changeRequests_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auditLog_changeRequests_requestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: changeRequests
            }
        }
    }, {
        sequelize,
        tableName: 'auditLog_changeRequests',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
