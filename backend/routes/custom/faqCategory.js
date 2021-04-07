const express = require('express')

const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {

    const db = req.app.get('db')

    return db.faqCategory.findAll({
        raw : true,
    })
        .then((faqCategory) => res.send(faqCategory))
        .catch((err) => {
            console.log('There was an error querying faqCategory', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const description_text = req.body.description
    const db = req.app.get('db')
    db.faqCategory.create({
        faqCategory_description: description_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating faqCategory', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {

    const faq_Category_id = req.body.id
    const description_text = req.body.description
    const db = req.app.get('db')

    db.faqCategory.update({
        faq_Category_description: description_text
    }, {
        where: {
            faq_Category_id: faq_Category_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating faqCategory', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:faq_Category_id', (req, res, next) => {

    const id = req.params.faq_Category_id;
    const db = req.app.get('db')

    db.faqCategory.destroy({
        where: { faq_Category_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting faqCategory', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router