const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example


router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.issueCategory.findAll({
        raw : true,

    })
        .then((issueCategory) => res.send(issueCategory))
        .catch((err) => {
            console.log('There was an error querying issueCategory', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const description_text = req.body.description
    const name_text = req.body.name
    const db = req.app.get('db')
    db.issueCategory.create({
        issueCategory_description: description_text,
        issueCategory_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating issueCategory', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {

    const issueCategory_id = req.body.id
    const issueCategory_names = req.body.name
    const issueCategory_text = req.body.description
    const db = req.app.get('db')

    db.issueType.update({
        issueCategory_description: issueCategory_text,
        issueCategory_name: issueCategory_names
    }, {
        where: {
            issueCategory_id: issueCategory_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating issueCategory', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:issueCategory_id', (req, res, next) => {
    //delete departments
    const id = req.params.issueCategory_id;
    const db = req.app.get('db')

    db.issueType.destroy({
        where: { issueCategory_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting issueCategory', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router