const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.assetList.findAll({
        include: [
            {
                model: db.assetStatus,
                attributes: ['assetStatus_id','assetStatus_name']
            },
            {
                model: db.assetType,
                attributes: ['assetType_id','assetType_name']
            },
            {
                model: db.vendors,
                attributes: ['vendor_id','vendor_name']
            },
            {
                model: db.users,
                attributes: ['user_id','email','f_name','l_name']
            }
        ],
        raw : true,
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying assetList', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.assetList.findAll({
        attributes:['asset_id','asset_name','serial_number'],
        raw : true,
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying vendors', JSON.stringify(err))
            return res.send(err)
        });
})


module.exports = router