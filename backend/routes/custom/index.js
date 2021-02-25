const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const account = require('./account')
const departments = require('./departments')
const roles = require('./roles')
const statuses = require('./statuses')
const users = require('./users')
const issueTypes = require('./issueType')

router.use('/api/home', home)
router.use('/api/account', account)
router.use('/api/departments', departments)
router.use('/api/roles', roles)
router.use('/api/status', statuses)
router.use('/api/users', users)
router.use('/api/issues', issueTypes)

module.exports = router
