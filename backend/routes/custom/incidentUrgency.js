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
        ],
        raw : true,
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
        attributes:['incidentUrgency_id','incidentUrgency_name'],
        raw : true,
    })
        .then((vendors) => res.send(vendors))
        .catch((err) => {
            console.log('There was an error querying incidentUrgency', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router