const express = require('express')

const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.paymentTerms.findAll({
        raw : true,
    })
        .then((paymentTerms) => res.send(paymentTerms))
        .catch((err) => {
            console.log('There was an error querying paymentTerms', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.paymentTerms.create({
        paymentTerm_name: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating paymentTerms', JSON.stringify(err))
            return res.send(err)
        })
})

router.put('/update', (req, res, next) => {
    const paymentTerm_id = req.body.id
    const name_text = req.body.name
    const db = req.app.get('db')

    db.paymentTerms.update({
        paymentTerm_name: name_text
    }, {
        where: {
            paymentTerm_id: paymentTerm_id
        }
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating paymentTerms', JSON.stringify(err))
            return res.send(err)
        })
})

router.delete('/delete/:paymentTerm_id', (req, res, next) => {
    const id = req.params.paymentTerm_id;
    const db = req.app.get('db')

    db.paymentTerms.destroy({
        where: { paymentTerm_id: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting paymentTerms', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router