const express = require('express')
const router = express.Router({ caseSensitive: true })

//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.ticketLog.findAll({
        include: [
            {
                model: db.users,
                as: 'createdBy',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.users,
                as: 'assignedUser',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.assetList,
                attributes: ['asset_id','asset_name']
            },
            {
                model: db.issueCategory,
                attributes: ['issueCategory_id','issueCategory_name']
            },
            {
                model: db.issueType,
                attributes: ['issueType_id','issueType_name']
            },
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.priorityList,
                attributes: ['priority_id','priority_name']
            },
            {
                model: db.requestStatus,
                attributes: ['requestStatus_id','requestStatus_name']
            },
            {
                model: db.resolvedList,
                attributes: ['resolvedList_id','resolvedList_name']
            },
            {
                model: db.softwareAssets,
                attributes: ['software_id','software_name']
            },
            {
                model: db.teams,
                attributes: ['team_id','team_name']
            }
        ]
        //raw : true
    })
        .then((ticketLog) => {
            res.send(ticketLog)
        })
        .catch((err) => {
            console.log('There was an error querying tickets', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.tickets.findAll({
        attributes:['ticket_id','ticket_name'],
        raw : true,
    })
        .then((tickets) => res.send(tickets))
        .catch((err) => {
            console.log('There was an error querying tickets', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/find/:ticketID', (req, res, next) => {
    const ticket_id = req.params.ticketID
    const db = req.app.get('db')

    return db.ticketLog.find({
        where: {ticket_id:ticket_id},
        include: [
            {
                model: db.users,
                as: 'createdBy',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.users,
                as: 'assignedUser',
                attributes: ['user_id','email','f_name','l_name']
            },
            {
                model: db.teams,
                attributes: ['team_id','team_name']
            },
            {
                model: db.assetList,
                attributes: ['asset_id','asset_name']
            },
            {
                model: db.issueCategory,
                attributes: ['issueCategory_id','issueCategory_name']
            },
            {
                model: db.issueType,
                attributes: ['issueType_id','issueType_name']
            },
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.priorityList,
                attributes: ['priority_id','priority_name']
            },
            {
                model: db.requestStatus,
                attributes: ['requestStatus_id','requestStatus_name']
            },
            {
                model: db.resolvedList,
                attributes: ['resolvedList_id','resolvedList_name']
            },
            {
                model: db.softwareAssets,
                attributes: ['software_id','software_name']
            },
        ]
    })
        .then((ticketLog) => {
            res.send(ticketLog)
        })
        .catch((err) => {
            console.log('There was an error querying tickets', JSON.stringify(err))
            return res.send(err)
        });
})

/*
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
*/
router.delete('/delete/:ticketID', (req, res, next) => {
    const ticket_id = req.params.ticketID;
    const db = req.app.get('db')

    db.users.destroy({
        where: { ticket_id: ticket_id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting tickets', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router