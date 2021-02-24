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
    //console.log('--------------------------------------------------------------------------------------------------')
    //console.log(JSON.stringify(req.params))
    //console.log(user_id)
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

router.put('/update/:userID', (req, res, next) => {
    //update users

    const user_id = req.params.userID;
    //const user_id = req.body.user_id
    const user_email = req.body.email
    const user_fname = req.body.f_name
    const user_lname = req.body.l_name
    const user_phone = req.body.phone
    const user_deptId = req.body.departmentId
    const user_roleId = req.body.roleId
    const user_approver = req.body.is_approver
    const user_statusId = req.body.statusId

    //console.log('--------------------------------------------------------------------------------------------------')
    //console.log(JSON.stringify(req.body))

    const db = req.app.get('db')

    db.users.update({
        email: user_email,
        f_name: user_fname,
        l_name: user_lname,
        phone: user_phone,
        departmentId: user_deptId,
        roleId: user_roleId,
        is_approver: user_approver,
        statusId: user_statusId
    }, {
        where: {
            user_id: user_id
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
    //delete users
    const user_id = req.params.userID;
    const db = req.app.get('db')

    db.users.destroy({
        where: { user_id: user_id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting users', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router