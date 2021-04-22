const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find/:incidentID', (req, res, next) => {
    const db = req.app.get('db')
    return db.incidentResponseLog.findAll({
        where: { incidentId: req.params.incidentID},
        include: [
            {
                model: db.users,
                attributes: ['user_id','email','f_name','l_name']
            }
        ]
    })
        .then((incidentLog) => res.send(incidentLog))
        .catch((err) => {
            console.log('There was an error querying incidentResponseLog', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.incidentResponseLog.create({
        incidentId: req.body.incidentId,
        incidentResponseLog_user: req.body.userId,
        incidentResponseLog_text: req.body.description
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating incidentResponseLog', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update', (req, res, next) => {
    const db = req.app.get('db')

    db.incidentResponseLog.update({
        incidentResponseLog_text: req.body.incidentResponseLogText
    }, {
        where: {
            incidentResponseLog_id: req.body.incidentResponseLogId
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentResponseLog', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:incidentResponseLog', (req, res, next) => {
    const db = req.app.get('db')

    db.incidentResponseLog.destroy({
        where: { incidentResponseLog_id: req.params.incidentResponseLogId }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting incidentResponseLog item', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router