const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.shippingMethods.findAll({
        raw : true,
    })
        .then((shippingMethods) => res.send(shippingMethods))
        .catch((err) => {
            console.log('There was an error querying shippingMethods', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.shippingMethods.create({
        shippingMethod_name: name_text
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error updating shippingMethods', JSON.stringify(err))
        return res.send(err)
    })
})

router.put('/update', (req, res, next) => {
    const shippingMethod_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    //console.log(req.body.id)
    console.log(req.body.name)
    //console.log(req.body.description)
    //console.log(JSON.stringify(req.body))

    db.shippingMethods.update({
        shippingMethod_name: name_text
        }, {
            where: {
                shippingMethod_id: shippingMethod_id
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating shippingMethods', JSON.stringify(err))
            return res.send(err)
    })
})

router.delete('/delete/:shippingMethod_id', (req, res, next) => {
    const id = req.params.shippingMethod_id;
    const db = req.app.get('db')

    db.shippingMethods.destroy({
        where: { shippingMethod_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting shippingMethods', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router