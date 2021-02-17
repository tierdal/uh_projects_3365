const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('roles', {
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
        tableName: 'roles',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: 'CREATED_AT',
        updatedAt: 'UPDATED_AT',
        deletedAt: false,
        indexes: [
            {
                name: "PK__roles__3213E83F1B5034D1",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};
