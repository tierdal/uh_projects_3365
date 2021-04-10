const express = require('express')

const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {

    const db = req.app.get('db')

    return db.assetStatus.findAll({
        raw : true,
    })
        .then((assetStatus) => res.send(assetStatus))
        .catch((err) => {
            console.log('There was an error querying assetStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.assetStatus.create({
        assetStatus_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating assetStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {

    const assetStatus_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.assetStatus.update({
        assetStatus_name: name_text
    }, {
        where: {
            assetStatus_id: assetStatus_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating assetStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:assetStatus_id', (req, res, next) => {

    const id = req.params.assetStatus_id;
    const db = req.app.get('db')

    db.assetStatus.destroy({
        where: { assetStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting assetStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router