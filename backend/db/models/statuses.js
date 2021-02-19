const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('statuses', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'statuses',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false,
        indexes: [
            {
                name: "PK__status__3213E83F1B5034D2",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};
