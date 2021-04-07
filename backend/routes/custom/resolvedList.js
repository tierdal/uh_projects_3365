const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.resolvedList.findAll({
        raw : true,
    })
        .then((resolvedList) => res.send(resolvedList))
        .catch((err) => {
            console.log('There was an error querying resolvedList', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.resolvedList.create({
        resolvedList_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating resolvedList', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const resolvedList_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.resolvedList.update({
        resolvedList_name: name_text
    }, {
        where: {
            resolvedList_id: resolvedList_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating resolvedList', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:resolvedList_id', (req, res, next) => {
    const id = req.params.resolvedList_id;
    const db = req.app.get('db')

    db.resolvedList.destroy({
        where: { resolved_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting resolvedList', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router