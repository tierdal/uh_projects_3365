const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find/:incidentID', (req, res, next) => {
    const db = req.app.get('db')
    return db.incidentLog.findAll({
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
            console.log('There was an error querying incidentworkLog', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.incidentLog.create({
        incidentId: req.body.incidentId,
        userId: req.body.userId,
        incidentworkLog_text: req.body.description
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating incidentworkLog', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const db = req.app.get('db')

    db.incidentLog.update({
        incidentworkLog_text: req.body.description
    }, {
        where: {
            incidentworkLog_id: req.body.id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentworkLog', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:incidentworklogId', (req, res, next) => {
    const db = req.app.get('db')

    db.incidentLog.destroy({
        where: { incidentworkLog_id: req.params.incidentworklogId }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting incidentworkLog item', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router