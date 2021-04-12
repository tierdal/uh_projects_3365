const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.post('/logAuditAccess', (req, res, next) => {
    console.log(JSON.stringify(req.body))
    const auditLog_access_userId = req.body.userId
    const auditLog_access_action = req.body.logAction
    const db = req.app.get('db')

    db.auditLog_access.create({
        auditLog_access_userId: auditLog_access_userId,
        auditLog_access_action: auditLog_access_action
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error logging auditLog_access', JSON.stringify(err))
            return res.send(err)
        })
})

module.exports = router