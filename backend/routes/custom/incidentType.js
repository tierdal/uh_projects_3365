const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentType.findAll({
        include: [
            db.teams
        ]
    })
        .then((incidentType) => res.send(incidentType))
        .catch((err) => {
            console.log('There was an error querying incidentType', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    const name_text = req.body.incidentTypeName
    const responsibleTeam = req.body.teamId

    db.incidentType.create({
        incidentType_name: name_text,
        incidentType_responsibleTeam: responsibleTeam
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentType', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const db = req.app.get('db')

    const incidentType_id = req.body.incidentTypeId
    const incidentType_name = req.body.incidentTypeName
    const incidentType_responsibleTeam = req.body.teamId

    db.incidentType.update({
        incidentType_name: incidentType_name,
        incidentType_responsibleTeam: incidentType_responsibleTeam
    }, {
        where: {
            incidentType_id: incidentType_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating incidentType', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:incidentTypeId', (req, res, next) => {
    const db = req.app.get('db')

    const id = req.params.incidentTypeId;

    db.incidentType.destroy({
        where: { incidentType_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting incidentType', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router