const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')

    return db.priorityList.findAll({
        include: [
            db.slaList
        ],

        raw : true,

    })
        .then((priorityList) => res.send(priorityList))
        .catch((err) => {
            console.log('There was an error querying priorityList', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const sla_id = req.body.sla_id
    const name_text = req.body.name
    const db = req.app.get('db')
    db.priorityList.create({
        priority_sla_id: sla_id,
        priority_name: name_text
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

    const priority_id = req.body.id
    const priority_names = req.body.name
    const priority_sla_id = req.body.sla_id
    const db = req.app.get('db')

    db.priorityList.update({
        include: [
            db.slaList
        ],
        priority_sla_id_description: priority_sla_id,
        priority_name: priority_names
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

router.delete('/delete/:priorityList_id', (req, res, next) => {
    //delete departments
    const id = req.params.priority_id;
    const db = req.app.get('db')

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