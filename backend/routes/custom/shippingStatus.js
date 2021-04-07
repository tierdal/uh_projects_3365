const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.shippingStatus.findAll({
        raw : true,
    })
        .then((shippingStatus) => res.send(shippingStatus))
        .catch((err) => {
            console.log('There was an error querying shippingStatus', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.shippingStatus.create({
        shippingStatus_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating shippingStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const shippingStatus_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.shippingStatus.update({
        shippingStatus_name: name_text
    }, {
        where: {
            shippingStatus_id: shippingStatus_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating shippingStatus', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:shippingStatus_id', (req, res, next) => {
    const id = req.params.shippingMethod_id;
    const db = req.app.get('db')

    db.shippingStatus.destroy({
        where: { shippingStatus_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting shippingStatus', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router