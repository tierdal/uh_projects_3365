const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.vendors.findAll({
        include: [
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.paymentTerms,
                attributes: ['paymentTerm_id','paymentTerm_name']
            }
        ],
        raw : true,
    })
        .then((vendors) => res.send(vendors))
        .catch((err) => {
            console.log('There was an error querying vendors', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.vendors.findAll({
        attributes:['vendor_id','vendor_name'],
        raw : true,
    })
        .then((vendors) => res.send(vendors))
        .catch((err) => {
            console.log('There was an error querying vendors', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router