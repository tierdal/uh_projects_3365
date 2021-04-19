const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.assetList.findAll({
        include: [
            /*{
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
            },*/
            db.assetStatus,
            db.assetType,
            db.vendors,
            db.users
        ],
        raw : true
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying assetList', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    //const asset_id = req.params.assetID

    const db = req.app.get('db')

    return db.assetList.find({
        where: {asset_id:asset_id},
        include: [
            db.assetStatus,
            db.assetType,
            db.vendors,
            db.users
        ],
        //attributes:['asset_id','asset_name','serial_number'],
        //raw : true,
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying assetList', JSON.stringify(err))
            return res.send(err)
        });
})

router.delete('/delete/:assetID', (req, res, next) => {
    //delete users
    const asset_id = req.params.assetID;
    const db = req.app.get('db')

    db.assetList.destroy({
        where: { asset_id: asset_id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting asset', JSON.stringify(err))
        return res.send(err)
    });
})



module.exports = router