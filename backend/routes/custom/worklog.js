const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find/:ticketID', (req, res, next) => {
    const db = req.app.get('db')
    return db.workLog.findAll({
        where: { ticketId: req.params.ticketID},
        include: [
            {
                model: db.users,
                attributes: ['user_id','email','f_name','l_name']
            }
        ]
    })
        .then((workLog) => res.send(workLog))
        .catch((err) => {
            console.log('There was an error querying workLog', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.workLog.create({
        ticketId: req.body.ticketId,
        userId: req.body.userId,
        workLog_text: req.body.description
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating workLog', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const db = req.app.get('db')

    db.workLog.update({
        workLog_text: req.body.description
    }, {
        where: {
            workLog_id: req.body.id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating workLog', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:worklogId', (req, res, next) => {
    const db = req.app.get('db')

    db.workLog.destroy({
        where: { workLog_id: req.params.worklogId }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting worklog item', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router