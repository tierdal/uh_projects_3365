const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.requestStatus.findAll({
        raw : true,
    })
        .then((requestStatus) => res.send(requestStatus))
        .catch((err) => {
            console.log('There was an error querying requestStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.requestStatus.create({
        requestStatus_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating requestStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const requestStatus_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.requestStatus.update({
        requestStatus_name: name_text
    }, {
        where: {
            requestStatus_id: requestStatus_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating requestStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:requestStatus_id', (req, res, next) => {
    const id = req.params.requestStatus_id;
    const db = req.app.get('db')

    db.requestStatus.destroy({
        where: { requestStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting requestStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router