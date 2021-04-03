const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('auditLog_tasks', {
        auditLog_tasks_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auditLog_tasks_userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
            }
        },
        auditLog_tasks_action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auditLog_tasks_taskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: taskList
            }
        }
    }, {
        sequelize,
        tableName: 'auditLog_tasks',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: false,
        deletedAt: false
    });
};
