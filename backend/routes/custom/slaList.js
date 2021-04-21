const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.slaList.findAll({
        raw : true,

    })
        .then((slaList) => res.send(slaList))
        .catch((err) => {
            console.log('There was an error querying slaList', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const duration_text = req.body.duration
    const name_text = req.body.name
    const db = req.app.get('db')
    db.slaList.create({
        sla_duration: duration_text,
        sla_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating slaList', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {

    const sla_id = req.body.id
    const sla_names = req.body.name
    const duration_text = req.body.duration
    const db = req.app.get('db')

    db.slaList.update({
        sla_duration: duration_text,
        sla_name: sla_names
    }, {
        where: {
            sla_id: sla_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating slaList', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:sla_id', (req, res, next) => {
    //delete departments
    const id = req.params.sla_id;
    const db = req.app.get('db')

    db.slaList.destroy({
        where: { sla_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting slaList', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router