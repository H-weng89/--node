const express = require('express')
const expressJoi = require('@escook/express-joi')

const {rule,rule2}  = require('../rules/userInfo')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../avatar'))
    },
    filename: function (req, file, cb) {
      console.log(req.user)
     
      cb(null, req.user.username+'.'+file.mimetype.split('/')[1])
    }
  })
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ storage:storage})


let router = express.Router()
let action = require('../router_handle/userinfo')

router.get('/getInfo',action.getInfo)
router.post('/update',expressJoi(rule),action.update)
router.post('/updatepwd',expressJoi(rule2),action.updatepwd)
router.post('/avatar',upload.single('avatar'),action.avatar)

module.exports = router