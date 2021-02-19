const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/findall', (req, res, next) => {
    //list status
    const db = req.app.get('db')
    //console.log('start')
    //console.log(req)
    //console.log(req.query.sort)
    //console.log(req.query.page)
    //console.log(req.query.per_page)
    //db.accountType.findAll({raw : true}).then(data => {console.log(data)})

    //console.log('end')

    return db.status.findAll({
        raw : true,
        //limit: parseInt(req.query.per_page),
        //page: parseInt(req.query.page)
    })
        .then((status) => res.send(status))
        .catch((err) => {
            console.log('There was an error querying status', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    //create status
    const description_text = req.body.description
    const db = req.app.get('db')
    db.status.create({
        description: description_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating status', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    //update status

    const status_id = req.body.id
    const description_text = req.body.description
    const db = req.app.get('db')

    console.log(req.body.id)
    console.log(req.body.description)

    db.status.update({
        description: description_text
    }, {
        where: {
            id: status_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating status', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:statusId', (req, res, next) => {
    //delete status
    const id = req.params.statusId;
    const db = req.app.get('db')

    db.status.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting status', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router