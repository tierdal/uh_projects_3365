const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.softwareAssets.findAll({
        include: [
            {
                model: db.softwareStatus,
                attributes: ['softwareStatus_id','softwareStatus_description']
            },
            {
                model: db.vendors,
                attributes: ['vendor_id','vendor_name']
            }
        ],
        raw : true,
    })
        .then((softwareAssets) => res.send(softwareAssets))
        .catch((err) => {
            console.log('There was an error querying softwareAssets', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.softwareAssets.findAll({
        attributes:['software_id','software_name'],
        raw : true,
    })
        .then((softwareAssets) => res.send(softwareAssets))
        .catch((err) => {
            console.log('There was an error querying softwareAssets', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router