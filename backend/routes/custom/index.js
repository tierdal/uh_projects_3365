const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const account = require('./account')
const departments = require('./departments')

router.use('/api/home', home)
router.use('/api/account', account)
router.use('/api/departments', departments)

module.exports = router
