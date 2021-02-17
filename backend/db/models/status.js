const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('status', {
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
        tableName: 'status',
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
