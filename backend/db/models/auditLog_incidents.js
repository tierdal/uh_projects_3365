const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('auditLog_incidents', {
        auditLog_incidents_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_incidents_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        auditLog_incidents_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auditLog_incidents_incidentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: incidentLog
            }
        }
    }, {
        sequelize,
        tableName: 'auditLog_incidents',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
