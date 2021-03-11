const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    //list departments
    const db = req.app.get('db')
    //console.log('start')
    //console.log(req)
    //console.log(req.query.sort)
    //console.log(req.query.page)
    //console.log(req.query.per_page)
    //db.accountType.findAll({raw : true}).then(data => {console.log(data)})

    //console.log('end')

    return db.softwareStatus.findAll({
        raw : true,
        //limit: parseInt(req.query.per_page),
        //page: parseInt(req.query.page)
    })
        .then((softwareStatus) => res.send(softwareStatus))
        .catch((err) => {
            console.log('There was an error querying softwareStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const description_text = req.body.description
    const db = req.app.get('db')
    db.softwareStatus.create({
        softwareStatus_description: description_text
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error updating softwareStatus', JSON.stringify(err))
        return res.send(err)
    })
})

router.put('/update', (req, res, next) => {
    //update departments

    const softwareStatus_id = req.body.id
    const description_text = req.body.description
    const db = req.app.get('db')

    //console.log(req.body.id)
    //console.log(req.body.name)
    //console.log(req.body.description)
    //console.log(JSON.stringify(req.body))

    db.softwareStatus.update({
        softwareStatus_description: description_text
        }, {
            where: {
                softwareStatus_id: softwareStatus_id
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating softwareStatus', JSON.stringify(err))
            return res.send(err)
    })
})

router.delete('/delete/:softwareStatus_id', (req, res, next) => {
    //delete departments
    const id = req.params.softwareStatus_id;
    const db = req.app.get('db')

    db.softwareStatus.destroy({
        where: { softwareStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting softwareStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router