const express = require('express')
const router = express.Router()
const action = require('../router_handle/user')
const {rule} = require('../rules/user')
const expressJoi = require('@escook/express-joi')

//ע��ӿ�
router.post('/register', expressJoi(rule),action.register)

//��¼
router.post('/login',expressJoi(rule),action.login)

module.exports = router