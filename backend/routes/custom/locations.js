const express = require('express')
const router = express.Router({ caseSensitive: true })
//https://grokonez.com/frontend/vue-js/vue-js-nodejs-express-restapis-sequelize-orm-mysql-crud-example

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.locations.findAll({
        include: [
            db.locationType
        ]
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
        attributes:['location_id','location_name']
    })
        .then((locations) => res.send(locations))
        .catch((err) => {
            console.log('There was an error querying locations', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:locationID', (req, res, next) => {
    const db = req.app.get('db')

    return db.locations.find({
        where: {location_id:req.params.locationID},
        include: [
            db.locationType
        ]
    })
        .then((locations) => {
            res.send(locations)
        })
        .catch((err) => {
            console.log('There was an error querying locations', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    db.locations.create({
        location_name: req.body.locationName,
        locationTypeId: req.body.locationTypeId,
        location_street: req.body.locationStreet,
        location_street2: req.body.locationStreet2,
        location_city: req.body.locationCity,
        location_state: req.body.locationState,
        location_zip: req.body.locationZip,
        location_country: req.body.locationCountry
    })
        .then((result) => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error creating a location', JSON.stringify(err))
            return res.send(err)
        })
})
router.put('/update/:locationID', (req, res, next) => {
    const db = req.app.get('db')

    db.locations.update({
        location_name: req.body.locationName,
        locationTypeId: req.body.locationTypeId,
        location_street: req.body.locationStreet,
        location_street2: req.body.locationStreet2,
        location_city: req.body.locationCity,
        location_state: req.body.locationState,
        location_zip: req.body.locationZip,
        location_country: req.body.locationCountry
    }, {
        where: {
            location_id: req.params.locationID
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating location', JSON.stringify(err))
            return res.send(err)
        })
})
router.delete('/delete/:locationID', (req, res, next) => {
    const db = req.app.get('db')

    db.locations.destroy({
        where: { location_id: req.params.locationID }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting location', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router