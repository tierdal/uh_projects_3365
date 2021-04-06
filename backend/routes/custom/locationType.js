const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {

    const db = req.app.get('db')

    return db.locationType.findAll({
        raw : true,

    })
        .then((locationType) => res.send(locationType))
        .catch((err) => {
            console.log('There was an error querying locationType', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const description_text = req.body.description
    const db = req.app.get('db')
    db.locationType.create({
        locationType_description: description_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating locationType', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {

    const locationType_id = req.body.id
    const description_text = req.body.description
    const db = req.app.get('db')

    db.locationType.update({
        locationType_description: description_text
    }, {
        where: {
            locationType_id: locationType_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating locationType', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:locationType_id', (req, res, next) => {
    //delete departments
    const id = req.params.locationType_id;
    const db = req.app.get('db')

    db.locationType.destroy({
        where: { locationType_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting locationType', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router