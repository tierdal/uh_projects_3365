const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.locations.findAll({
        raw : true,
    })
        .then((locations) => res.send(locations))
        .catch((err) => {
            console.log('There was an error querying locations', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.locations.findAll({
        attributes:['location_id','location_name'],
        raw : true,
    })
        .then((locations) => res.send(locations))
        .catch((err) => {
            console.log('There was an error querying locations', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router