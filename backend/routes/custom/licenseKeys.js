const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.licenseKeys.findAll({
        include: [
            {
                model: db.softwareAssets,
                attributes: ['software_id','software_name']
            },
            {
                model: db.users,
                attributes: ['user_id','f_name']
            }
        ],
        raw : true,
    })
        .then((licenseKeys) => res.send(licenseKeys))
        .catch((err) => {
            console.log('There was an error querying licenseKeys', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.licenseKeys.findAll({
        attributes:['license_id','license_key'],
        raw : true,
    })
        .then((licenseKeys) => res.send(licenseKeys))
        .catch((err) => {
            console.log('There was an error querying licenseKeys', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router