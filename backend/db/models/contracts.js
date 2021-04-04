const Sequelize = require('sequelize');
const _vendors = require("./vendors");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const vendors = _vendors(sequelize, DataTypes);

    return sequelize.define('contracts', {
        contract_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        contract_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contract_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vendorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: vendors
                //key: vendor_id
            }
        },
        contract_file: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'contracts',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
        /*indexes: [
            {
                name: "",
                unique: true,
                fields: [
                    { name: "" },
                ]
            },
        ]*/
    });
};
