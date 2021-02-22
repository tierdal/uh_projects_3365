const express = require('express')
const router = express.Router({ caseSensitive: true })
//const _departments = require('../../db/models/departments');
//const _roles = require('../../db/models/roles');
//const _statuses = require('../../db/models/statuses');
//const DataTypes = require("sequelize").DataTypes;
//const statuses = _statuses(sequelize, DataTypes);

//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {

    //const departments = _departments(sequelize, DataTypes);
    //const roles = _roles(sequelize, DataTypes);

    //console.log('start')
    //list users
    const db = req.app.get('db')
    //console.log(req)
    //console.log(req.query.sort)
    //console.log(req.query.page)
    //console.log(req.query.per_page)
    //db.accountType.findAll({raw : true}).then(data => {console.log(data)})

    //console.log(db.users)
    //console.log('end')

    return db.users.findAll({
    //const usersResults = db.users.findAll({
        include: [
            db.statuses,
            db.roles,
            db.departments
        ],
        raw : true
    })
        .then((users) => res.send(users))
        .catch((err) => {
            console.log('There was an error querying users', JSON.stringify(err))
            return res.send(err)
        });

    //console.log(usersResults.user_id)

})
router.get('/find/:userID', (req, res, next) => {
    //list users
    const user_id = req.params.userID
    console.log('--------------------------------------------------------------------------------------------------')
    console.log(JSON.stringify(req.params))
    console.log(user_id)
    const db = req.app.get('db')

    return db.users.find({
        where: {user_id:user_id},
        include: [
            db.statuses,
            db.roles,
            db.departments
        ]})
        .then((users) => res.send(users))
        .catch((err) => {
            console.log('There was an error querying users', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    //create users
    const description_text = req.body.description
    const db = req.app.get('db')
    db.users.create({
        description: description_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating users', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    //update users

    const user_id = req.body.id
    //const description_text = req.body.description
    const db = req.app.get('db')

    console.log(req.body.id)
    //console.log(req.body.description)

    db.users.update({
        //description: description_text
    }, {
        where: {
            id: user_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating users', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:userId', (req, res, next) => {
    //delete users
    const id = req.params.userId;
    const db = req.app.get('db')

    db.users.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting users', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router