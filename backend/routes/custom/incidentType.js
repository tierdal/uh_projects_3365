const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.incidentType.findAll({
        include: [
            db.teams
        ],
        raw : true,

    })
        .then((incidentType) => res.send(incidentType))
        .catch((err) => {
            console.log('There was an error querying incidentType', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const responsibleTeam_text = req.body.responsibleTeam
    const name_text = req.body.name
    const db = req.app.get('db')
    db.incidentType.create({
        incidentType_responsibleTeam: responsibleTeam_text,
        incidentType_name: name_text
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

    const incidentType_id = req.body.id
    const incidentType_name = req.body.name
    const incidentType_responsibleTeam = req.body.responsibleTeam
    const db = req.app.get('db')

    db.incidentType.update({
        incidentType_responsibleTeam: incidentType_responsibleTeam,
        incidentType_name: incidentType_name
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

router.delete('/delete/:incidentType_id', (req, res, next) => {
    //delete departments
    const id = req.params.incidentType_id;
    const db = req.app.get('db')

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