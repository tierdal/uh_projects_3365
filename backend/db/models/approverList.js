const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('approverList', {
        user_getsapproved: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: 'user_id'
            }
        },
        user_approver: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: 'user_id'
            }
        }
    }, {
        sequelize,
        tableName: 'approverList',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
