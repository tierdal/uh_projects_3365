const Sequelize = require('sequelize');
const _faqCategory = require("./faqCategory");
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {

    const faqCategory = _faqCategory(sequelize, DataTypes);

    return sequelize.define('faqList', {
        faq_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        faq_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        faq_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        faq_categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: faqCategory
            }
        }
    }, {
        sequelize,
        tableName: 'faqList',
        schema: 'dbo',
        timestamps: true,
        underscored: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    });
};
