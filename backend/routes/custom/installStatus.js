const express = require('express')

const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {

    const db = req.app.get('db')

    return db.installStatusList.findAll({
        raw : true,
    })
        .then((installStatusList) => res.send(installStatusList))
        .catch((err) => {
            console.log('There was an error querying installStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const description_text = req.body.description
    const db = req.app.get('db')
    db.installStatusList.create({
        installStatus_description: description_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating installStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {

    const installStatus_id = req.body.id
    const description_text = req.body.description
    const db = req.app.get('db')

    db.installStatusList.update({
        installStatus_description: description_text
    }, {
        where: {
            installStatus_id: installStatus_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating installStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:installStatus_id', (req, res, next) => {

    const id = req.params.installStatus_id;
    const db = req.app.get('db')

    db.installStatusList.destroy({
        where: { installStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting installStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router