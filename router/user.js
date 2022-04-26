const express = require('express')
const router = express.Router()
const action = require('../router_handle/user')
const {rule} = require('../rules/user')
const expressJoi = require('@escook/express-joi')


router.post('/register', expressJoi(rule),action.register)


router.post('/login',expressJoi(rule),action.login)

module.exports = router