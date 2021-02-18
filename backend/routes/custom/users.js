const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    //list users
    const db = req.app.get('db')
    //console.log('start')
    //console.log(req)
    //console.log(req.query.sort)
    //console.log(req.query.page)
    //console.log(req.query.per_page)
    //db.accountType.findAll({raw : true}).then(data => {console.log(data)})

    //console.log('end')

    return db.users.findAll({
        raw : true,
        //limit: parseInt(req.query.per_page),
        //page: parseInt(req.query.page)
    })
        .then((users) => res.send(users))
        .catch((err) => {
            console.log('There was an error querying users', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:userID', (req, res, next) => {
    //list users
    const id = req.params.userId;
    const db = req.app.get('db')

    return db.users.findById(id)
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