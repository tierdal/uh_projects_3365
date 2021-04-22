const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.post('/logAuditAccess', (req, res, next) => {
    const db = req.app.get('db')

    db.auditLog_access.create({
        auditLog_access_userId: auditLog_access_userId,
        auditLog_access_action: req.body.logAction
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error logging auditLog_access', JSON.stringify(err))
            return res.send(err)
        })
})

router.post('/logAuditTickets', (req, res, next) => {
    const db = req.app.get('db')

    db.auditLog_tickets.create({
        auditLog_tickets_userId: req.body.userId,
        auditLog_tickets_action: req.body.logAction,
        auditLog_tickets_ticketId: req.body.logExtra
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error logging auditLog_tickets', JSON.stringify(err))
            return res.send(err)
        })
})

router.post('/logAuditIncidents', (req, res, next) => {
    const db = req.app.get('db')

    db.auditLog_tickets.create({
        auditLog_incidents_userId: req.body.userId,
        auditLog_incidents_action: req.body.logAction,
        auditLog_incidents_incidentId: req.body.logExtra
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error logging auditLog_tickets', JSON.stringify(err))
            return res.send(err)
        })
})

module.exports = router