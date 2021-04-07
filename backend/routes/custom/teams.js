const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.teams.findAll({
        raw : true,
    })
        .then((teams) => res.send(teams))
        .catch((err) => {
            console.log('There was an error querying team', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.teams.create({
        team_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating teams', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    //update departments

    const team_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.teams.update({
        team_name: name_text
    }, {
        where: {
            team_id: team_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating teams', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:team_id', (req, res, next) => {
    const id = req.params.team_id;
    const db = req.app.get('db')

    db.teams.destroy({
        where: { team_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting team', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router