const express = require('express')
const router = express.Router({ caseSensitive: true })

//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.users.findAll({
        include: [
            db.statuses,
            db.roles,
            db.departments
        ]
    })
        .then((users) => res.send(users))
        .catch((err) => {
            console.log('There was an error querying users', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:userID', (req, res, next) => {
    const user_id = req.params.userID
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
router.get('/findreport', (req, res, next) => {
    const db = req.app.get('db')
    const whereStatement = {};
    if(req.query.departmentId) {whereStatement.departmentId = req.query.departmentId}
    if(req.query.roleId) {whereStatement.roleId = req.query.roleId}
    if(req.query.is_approver) {whereStatement.is_approver = req.query.is_approver}
    if(req.query.statusId) {whereStatement.statusId = req.query.statusId}

    return db.users.findAll({
        include: [
            db.statuses,
            db.roles,
            db.departments
        ],
        where: whereStatement
    })
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            console.log('There was an error querying tickets', JSON.stringify(err))
            return res.send(err)
        });
})
router.put('/update/:userID', (req, res, next) => {
    const db = req.app.get('db')

    db.users.update({
        email: req.body.email,
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        phone: req.body.phone,
        departmentId: req.body.departmentId,
        roleId: req.body.roleId,
        is_approver: req.body.is_approver,
        statusId: req.body.statusId
    }, {
        where: {
            user_id: req.params.userID
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
router.delete('/delete/:userID', (req, res, next) => {
    const db = req.app.get('db')

    db.users.destroy({
        where: { user_id: req.params.userID }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting users', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router