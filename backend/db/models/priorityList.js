const Sequelize = require('sequelize');
const _slaList = require("./slaList");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const slaList = _slaList(sequelize, DataTypes);

    return sequelize.define('prioritylist', {
        priority_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        priority_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority_sla_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: slaList
                //key: sla_id
            }
        }
    }, {
        sequelize,
        tableName: 'priorityList',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
