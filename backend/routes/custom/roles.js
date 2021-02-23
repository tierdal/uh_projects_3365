const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    //list roles
    const db = req.app.get('db')
    //console.log('start')
    //console.log(req)
    //console.log(req.query.sort)
    //console.log(req.query.page)
    //console.log(req.query.per_page)
    //db.accountType.findAll({raw : true}).then(data => {console.log(data)})

    //console.log('end')

    return db.roles.findAll({
        raw : true,
        //limit: parseInt(req.query.per_page),
        //page: parseInt(req.query.page)
    })
        .then((roles) => res.send(roles))
        .catch((err) => {
            console.log('There was an error querying roles', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    //create roles
    const description_text = req.body.description
    const db = req.app.get('db')
    db.roles.create({
        description: description_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating roles', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    //update roles

    const role_id = req.body.id
    const description_text = req.body.description
    const db = req.app.get('db')

    console.log(req.body.id)
    console.log(req.body.description)

    db.roles.update({
        description: description_text
    }, {
        where: {
            id: role_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating roles', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:roleId', (req, res, next) => {
    //delete roles
    const id = req.params.roleId;
    const db = req.app.get('db')

    db.roles.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting roles', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router