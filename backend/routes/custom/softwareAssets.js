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
        ]
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
        attributes:['software_id','software_name']
    })
        .then((softwareAssets) => res.send(softwareAssets))
        .catch((err) => {
            console.log('There was an error querying softwareAssets', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:softwareID', (req, res, next) => {
    const db = req.app.get('db')

    return db.softwareAssets.find({
        where: {software_id:req.params.softwareID},
        include: [
            {
                model: db.softwareStatus,
                attributes: ['softwareStatus_id','softwareStatus_description']
            },
            {
                model: db.vendors,
                attributes: ['vendor_id','vendor_name']
            }
        ]
    })
        .then((softwareAssets) => {
            res.send(softwareAssets)
        })
        .catch((err) => {
            console.log('There was an error querying softwareAssets', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.softwareAssets.create({
        software_name: req.body.softwareName,
        software_description: req.body.softwareDescription,
        softwareStatusId: req.body.softwareStatusId,
        vendorId: req.body.vendorId,
        purchase_date: req.body.purchaseDate,
        software_notes: req.body.softwareNotes
    })
        .then((result) => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating a softwareAssets', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:softwareID', (req, res, next) => {
    const db = req.app.get('db')

    db.softwareAssets.update({
        software_name: req.body.softwareName,
        software_description: req.body.softwareDescription,
        softwareStatusId: req.body.softwareStatusId,
        vendorId: req.body.vendorId,
        purchase_date: req.body.purchaseDate,
        software_notes: req.body.softwareNotes
    }, {
        where: {
            software_id: req.params.softwareID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating softwareAssets', JSON.stringify(err))
            return res.send(err)
        })
})
router.delete('/delete/:softwareID', (req, res, next) => {
    const db = req.app.get('db')

    db.softwareAssets.destroy({
        where: { software_id: req.params.softwareID }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting softwareAssets', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router