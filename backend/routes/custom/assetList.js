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
        ]
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying assetList', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')
    console.log(JSON.stringify(req.query))

    return db.assetList.findAll({
        attributes:['asset_id','asset_name','serial_number'],
        where:{userId: req.query.userId}
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying assetList', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:assetID', (req, res, next) => {
    const asset_id = req.params.assetID

    const db = req.app.get('db')

    return db.assetList.find({
        where: {asset_id:asset_id},
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
        ]
    })
        .then((assetList) => res.send(assetList))
        .catch((err) => {
            console.log('There was an error querying assetList', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.assetList.create({
        asset_name: req.body.assetName,
        asset_description: req.body.assetDescription,
        serial_number: req.body.serialNumber,
        assetStatusId: req.body.assetStatusId,
        assetTypeId: req.body.assetTypeId,
        vendorId: req.body.vendorId,
        userId: req.body.userId,
        purchase_date: req.body.purchaseDate,
        asset_notes: req.body.assetNotes
    })
        .then((result) => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating a assetList', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:assetID', (req, res, next) => {
    const db = req.app.get('db')

    db.assetList.update({
        asset_name: req.body.assetName,
        asset_description: req.body.assetDescription,
        serial_number: req.body.serialNumber,
        assetStatusId: req.body.assetStatusId,
        assetTypeId: req.body.assetTypeId,
        vendorId: req.body.vendorId,
        userId: req.body.userId,
        purchase_date: req.body.purchaseDate,
        asset_notes: req.body.assetNotes
    }, {
        where: {
            asset_id: req.params.assetID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating assetList', JSON.stringify(err))
            return res.send(err)
        })
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