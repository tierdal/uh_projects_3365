const express = require('express')

const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.assetType.findAll({

        raw : true,
        //limit: parseInt(req.query.per_page),
        //page: parseInt(req.query.page)
    })
        .then((assetType) => res.send(assetType))
        .catch((err) => {
            console.log('There was an error querying assetType', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.assetType.create({
        issueType_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating assetType', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    //update departments

    const assetType_id = req.body.id
    const assetType_names = req.body.name
    const db = req.app.get('db')

    db.assetType.update({
        issueType_name: assetType_names
    }, {
        where: {
            assetType_id: assetType_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating assetType', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:assetType_id', (req, res, next) => {
    //delete departments
    const id = req.params.assetType_id;
    const db = req.app.get('db')

    db.assetType.destroy({
        where: { assetType_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting issueType', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router