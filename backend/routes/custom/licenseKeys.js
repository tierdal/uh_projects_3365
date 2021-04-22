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
                attributes: ['user_id','email']
            }
        ]
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
        attributes:['license_id','license_key']
    })
        .then((licenseKeys) => res.send(licenseKeys))
        .catch((err) => {
            console.log('There was an error querying licenseKeys', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:licenseKeysID', (req, res, next) => {
    const db = req.app.get('db')

    return db.licenseKeys.find({
        where: {license_id:req.params.licenseKeysID},
        include: [
            {
                model: db.softwareAssets,
                attributes: ['software_id','software_name']
            },
            {
                model: db.users,
                attributes: ['user_id','email']
            }
        ]
    })
        .then((licenseKeys) => {
            res.send(licenseKeys)
        })
        .catch((err) => {
            console.log('There was an error querying licenseKeys', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.licenseKeys.create({
        license_key: req.body.licenseKey,
        softwareId: req.body.softwareId,
        userId: req.body.userId
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating licenseKeys', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:licenseKeysID', (req, res, next) => {
    const db = req.app.get('db')

    db.licenseKeys.update({
        license_key: req.body.licenseKey,
        softwareId: req.body.softwareId,
        userId: req.body.userId
    }, {
        where: {
            faq_id: req.params.licenseKeysID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating licenseKeys', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:licenseKeysID', (req, res, next) => {
    const db = req.app.get('db')

    db.licenseKeys.destroy({
        where: { faq_id: req.params.licenseKeysID }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting licenseKeys', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router