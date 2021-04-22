const express = require('express')
const router = express.Router({ caseSensitive: true })

//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {

    const db = req.app.get('db')
    return db.faqList.findAll({
        include: [
            db.faqCategory
        ]
    })
        .then((faqList) => res.send(faqList))
        .catch((err) => {
            console.log('There was an error querying faqList', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:faqID', (req, res, next) => {
    const db = req.app.get('db')

    return db.faqList.find({
        where: {faq_id:req.params.faqID}
        })
        .then((faqList) => res.send(faqList))
        .catch((err) => {
            console.log('There was an error querying faqList', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const db = req.app.get('db')



    db.faqList.create({
        faq_title: req.body.faqTitle,
        faq_body: req.body.faqBody,
        faq_categoryId: req.body.faqCategoryId
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating faqList', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:faqID', (req, res, next) => {
    const db = req.app.get('db')

    db.faqList.update({
        faq_title: req.body.faqTitle,
        faq_body: req.body.faqBody,
        faq_categoryId: req.body.faqCategoryId
    }, {
        where: {
            faq_id: req.params.faqID
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
    const db = req.app.get('db')

    db.faqList.destroy({
        where: { faq_id: req.params.faqID }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting faqList', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router