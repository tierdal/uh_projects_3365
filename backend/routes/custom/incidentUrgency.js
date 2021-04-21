const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentUrgency.findAll({
        include: [
            {
                model: db.slaList,
                attributes: ['sla_id','sla_name']
            }
        ]
    })
        .then((incidentUrgency) => res.send(incidentUrgency))
        .catch((err) => {
            console.log('There was an error querying incidentUrgency', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentUrgency.findAll({
        attributes:['incidentUrgency_id','incidentUrgency_name']
    })
        .then((vendors) => res.send(vendors))
        .catch((err) => {
            console.log('There was an error querying incidentUrgency', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    const sla_id = req.body.slaId
    const name_text = req.body.urgencyName

    db.incidentUrgency.create({
        incidentUrgency_name: name_text,
        incidentUrgency_SLA: sla_id
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentUrgency', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const db = req.app.get('db')

    const id = req.body.urgencyId
    const name = req.body.urgencyName
    const sla_id = req.body.slaId

    db.incidentUrgency.update({
        incidentUrgency_name: name,
        incidentUrgency_SLA: sla_id
    }, {
        where: {
            incidentUrgency_id: id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentUrgency', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:urgencyId', (req, res, next) => {
    const db = req.app.get('db')

    const id = req.params.urgencyId;

    db.incidentUrgency.destroy({
        where: { incidentUrgency_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting incidentUrgency', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router