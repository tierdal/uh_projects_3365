const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.priorityList.findAll({
        include: [
            db.slaList
        ]
    })
        .then((priorityList) => res.send(priorityList))
        .catch((err) => {
            console.log('There was an error querying priorityList', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.priorityList.findAll({
        attributes:['priority_id','priority_name'],
        raw : true,
    })
        .then((priorityList) => res.send(priorityList))
        .catch((err) => {
            console.log('There was an error querying priorityList', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    const sla_id = req.body.slaId
    const name_text = req.body.priorityName

    db.priorityList.create({
        priority_name: name_text,
        priority_sla_id: sla_id
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating priorityList', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const db = req.app.get('db')

    const priority_id = req.body.priorityId
    const priority_name = req.body.priorityName
    const priority_sla_id = req.body.slaId

    db.priorityList.update({
        priority_name: priority_name,
        priority_sla_id: priority_sla_id
    }, {
        where: {
            priority_id: priority_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating priorityList', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:priorityId', (req, res, next) => {
    const db = req.app.get('db')

    const id = req.params.priorityId;

    db.priorityList.destroy({
        where: { priority_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting priorityList', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router