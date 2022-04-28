const express = require('express')
const router = express.Router()
const action = require('../router_handle/user')
const {rule} = require('../rules/user')
const expressJoi = require('@escook/express-joi')
/**
 * @api {post} /user/login 用户登录
 * @apiDescription 用户登录
 * @apiName submit-login
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码

 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "0",
 *      "data" : {
 *         
 *      },
 * "msg":"success"
 *  } 
 * @apiSampleRequest http://localhost:8081/user/login
 * @apiVersion 1.0.0
 */

/**
 * @api {post} /user/register 用户注册
 * @apiDescription 用户注册
 * @apiName register
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码

 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "0",
 *      "data" : {
 *         
 *      },
 * "msg":"success"
 *  } 
 * @apiSampleRequest http://localhost:8081/user/register
 * @apiVersion 1.0.0
 */

router.post('/register', expressJoi(rule),action.register)

router.post('/login',expressJoi(rule),action.login)


module.exports = router