const express = require('express')
const expressJoi = require('@escook/express-joi')

const {rule,rule2}  = require('../rules/userInfo')
// ������� formdata ��ʽ�����ݵİ�
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
// ���봦��·���ĺ���ģ��
const path = require('path')

// ���� multer ��ʵ������ͨ�� dest ����ָ���ļ��Ĵ��·��
const upload = multer({ storage:storage})


let router = express.Router()
let action = require('../router_handle/userinfo')

router.get('/getInfo',action.getInfo)
router.post('/update',expressJoi(rule),action.update)
router.post('/updatepwd',expressJoi(rule2),action.updatepwd)
router.post('/avatar',upload.single('avatar'),action.avatar)

module.exports = router