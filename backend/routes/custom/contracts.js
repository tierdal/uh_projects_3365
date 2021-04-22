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
        ]
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
        attributes:['contract_id','contract_name']
    })
        .then((contracts) => res.send(contracts))
        .catch((err) => {
            console.log('There was an error querying contracts', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:contractID', (req, res, next) => {
    const db = req.app.get('db')

    return db.contracts.find({
        where: {contract_id:req.params.contractID},
        include: [
            {
                model: db.vendors,
                attributes: ['vendor_id','vendor_name']
            }
        ]
    })
        .then((contracts) => {
            res.send(contracts)
        })
        .catch((err) => {
            console.log('There was an error querying contracts', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.contracts.create({
        contract_name: req.body.contractName,
        contract_description: req.body.contractDescription,
        vendorId: req.body.vendorId,
        locationId: req.body.locationId
    })
        .then((result) => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating a contracts', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:contractID', (req, res, next) => {
    const db = req.app.get('db')

    db.contracts.update({
        contract_name: req.body.contractName,
        contract_description: req.body.contractDescription,
        vendorId: req.body.vendorId,
        locationId: req.body.locationId
    }, {
        where: {
            contract_id: req.params.contractID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating contracts', JSON.stringify(err))
            return res.send(err)
        })
})
router.delete('/delete/:contractID', (req, res, next) => {
    const db = req.app.get('db')

    db.contracts.destroy({
        where: { contract_id: req.params.contractID }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting contracts', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router