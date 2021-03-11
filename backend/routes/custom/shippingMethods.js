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

    return db.shippingMethods.findAll({
        raw : true,
        //limit: parseInt(req.query.per_page),
        //page: parseInt(req.query.page)
    })
        .then((shippingMethods) => res.send(shippingMethods))
        .catch((err) => {
            console.log('There was an error querying shippingMethods', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    //create departments
    const name_text = req.body.name
    const db = req.app.get('db')
    db.shippingMethods.create({
        shippingMethods_name: name_text
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error updating shippingMethods', JSON.stringify(err))
        return res.send(err)
    })
})

router.put('/update', (req, res, next) => {
    //update departments

    const shippingMethods_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    //console.log(req.body.id)
    //console.log(req.body.name)
    //console.log(req.body.description)
    //console.log(JSON.stringify(req.body))

    db.shippingMethods.update({
        shippingMethods_description: name_text
        }, {
            where: {
                shippingMethods_id: shippingMethods_id
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating shippingMethods', JSON.stringify(err))
            return res.send(err)
    })
})

router.delete('/delete/:shippingMethods_id', (req, res, next) => {
    //delete departments
    const id = req.params.shippingMethods_id;
    const db = req.app.get('db')

    db.shippingMethods.destroy({
        where: { shippingMethods_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting shippingMethods', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router