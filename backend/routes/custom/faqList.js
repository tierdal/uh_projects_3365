const express = require('express')
const router = express.Router({ caseSensitive: true })
//const _departments = require('../../db/models/departments');
//const _roles = require('../../db/models/roles');
//const _statuses = require('../../db/models/statuses');
//const DataTypes = require("sequelize").DataTypes;
//const statuses = _statuses(sequelize, DataTypes);

//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {

    const db = req.app.get('db')
    return db.faqList.findAll({
        include: [
            db.faqCategory
        ],
        raw : true
    })
        .then((faqList) => res.send(faqList))
        .catch((err) => {
            console.log('There was an error querying faqList', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:faqID', (req, res, next) => {
    //console.log(req.params.faqID)
    const faq_id = req.params.faqID
    const db = req.app.get('db')

    return db.faqList.find({
        where: {faq_id:faq_id}
        })
        .then((faqList) => res.send(faqList))
        .catch((err) => {
            console.log('There was an error querying faqList', JSON.stringify(err))
            return res.send(err)
        });
})

router.put('/update/:faqID', (req, res, next) => {
    //update users

    const faq_id = req.params.faqID;
    const faq_title = req.body.title
    const faq_body = req.body.body
    const faq_categoryId = req.body.faq_categoryId

    //console.log('--------------------------------------------------------------------------------------------------')
    //console.log(JSON.stringify(req.body))

    const db = req.app.get('db')

    db.faqList.update({
        faq_title: faq_title,
        faq_body: faq_body,
        faq_categoryId: faq_categoryId
    }, {
        where: {
            faq_id: faq_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating faqList', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:faqID', (req, res, next) => {
    //delete users
    const faq_id = req.params.faqID;
    const db = req.app.get('db')

    db.faqList.destroy({
        where: { faq_id: faq_id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting faqList', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router