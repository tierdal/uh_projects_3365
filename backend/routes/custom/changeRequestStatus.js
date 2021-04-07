const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.changeRequestStatus.findAll({
        raw : true,
    })
        .then((changeRequestStatus) => res.send(changeRequestStatus))
        .catch((err) => {
            console.log('There was an error querying changeRequestStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.changeRequestStatus.create({
        changeRequestStatus_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating changeRequestStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const changeRequestStatus_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.changeRequestStatus.update({
        changeRequestStatus_name: name_text
    }, {
        where: {
            changeRequestStatus_id: changeRequestStatus_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating changeRequestStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:changeRequestStatus_id', (req, res, next) => {
    const id = req.params.changeRequestStatus_id;
    const db = req.app.get('db')

    db.changeRequestStatus.destroy({
        where: { changeRequestStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting changeRequestStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router