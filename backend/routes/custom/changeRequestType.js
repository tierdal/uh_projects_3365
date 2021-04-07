const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.changeRequestType.findAll({
        raw : true,
    })
        .then((changeRequestType) => res.send(changeRequestType))
        .catch((err) => {
            console.log('There was an error querying changeRequestType', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.changeRequestType.create({
        changeRequestType_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating changeRequestType', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const changeRequestType_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.changeRequestType.update({
        changeRequestType_name: name_text
    }, {
        where: {
            changeRequestType_id: changeRequestType_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating changeRequestType', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:changeRequestType_id', (req, res, next) => {
    const id = req.params.changeRequestType_id;
    const db = req.app.get('db')

    db.changeRequestType.destroy({
        where: { changeRequestType_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting changeRequestType', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router