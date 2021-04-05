const Sequelize = require('sequelize');
const _softwareAssets = require("./softwareAssets");
const _users = require("./users");
const _installStatusList = require("./installStatusList");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const softwareAssets = _softwareAssets(sequelize, DataTypes);
    const users = _users(sequelize, DataTypes);
    const installStatusList = _installStatusList(sequelize, DataTypes);

    return sequelize.define('software_install_status', {
        softwareId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: softwareAssets
                //key: software_id
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users
                //key: user_id
            }
        },
        installStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: installStatusList
                //key: installStatus_id
            }
        }
    }, {
        sequelize,
        tableName: 'software_install_status',
        schema: 'dbo',
        timestamps: false,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    });
};
