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
        ]
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
        attributes:['vendor_id','vendor_name']
    })
        .then((vendors) => res.send(vendors))
        .catch((err) => {
            console.log('There was an error querying vendors', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:vendorID', (req, res, next) => {
    const db = req.app.get('db')

    const vendor_id = req.params.vendorID

    return db.vendors.find({
        where: {vendor_id:vendor_id},
        include: [
            {
                model: db.locations,
                attributes: ['location_id','location_name']
            },
            {
                model: db.paymentTerms,
                attributes: ['paymentTerm_id','paymentTerm_name']
            }
        ]
    })
        .then((vendors) => {
            res.send(vendors)
        })
        .catch((err) => {
            console.log('There was an error querying vendors', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.vendors.create({
        vendor_name: req.body.vendorName,
        vendor_email: req.body.vendorEmail,
        vendor_phone: req.body.vendorPhone,
        locationId: req.body.locationId,
        vendor_notes: req.body.vendorNotes,
        paymentTermId: req.body.paymentTermId
    })
        .then((result) => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating a vendor', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:vendorID', (req, res, next) => {
    const db = req.app.get('db')

    db.vendors.update({
        vendor_name: req.body.vendorName,
        vendor_email: req.body.vendorEmail,
        vendor_phone: req.body.vendorPhone,
        locationId: req.body.locationId,
        vendor_notes: req.body.vendorNotes,
        paymentTermId: req.body.paymentTermId
    }, {
        where: {
            vendor_id: req.params.vendorID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating vendors', JSON.stringify(err))
            return res.send(err)
        })
})
router.delete('/delete/:vendorID', (req, res, next) => {
    const vendor_id = req.params.vendorID;
    const db = req.app.get('db')

    db.vendors.destroy({
        where: { vendor_id: vendor_id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting vendors', JSON.stringify(err))
        return res.send(err)
    });
})


module.exports = router