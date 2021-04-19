const express = require('express')

const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.contracts.findAll({
        include: [
            {
                model: db.vendors,
                attributes: ['vendor_id','vendor_name']
            }
            ],
        raw : true
    })
        .then((contracts) => res.send(contracts))
        .catch((err) => {
            console.log('There was an error querying contracts', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.contracts.findAll({
        attributes:['contract_id','contract_name'],
        raw : true,
    })
        .then((contracts) => res.send(contracts))
        .catch((err) => {
            console.log('There was an error querying contracts', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router