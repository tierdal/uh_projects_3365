const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.incidentStatus.findAll({
        raw : true,
    })
        .then((incidentStatus) => res.send(incidentStatus))
        .catch((err) => {
            console.log('There was an error querying changeRequestStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.incidentStatus.create({
        incidentStatus_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const incidentStatus_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.incidentStatus.update({
        incidentStatus_name: name_text
    }, {
        where: {
            incidentStatus_id: incidentStatus_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:incidentStatus_id', (req, res, next) => {
    const id = req.params.incidentStatus_id;
    const db = req.app.get('db')

    db.incidentStatus.destroy({
        where: { incidentStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting incidentStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router