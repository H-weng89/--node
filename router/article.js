let express = require('express')
let router = express.Router()
let action = require('../router_handle/article')
let expressJoi = require('@escook/express-joi')
let {addCate} = require('../rules/article')
//mul
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../article_img'))
    },
    filename: function (req, file, cb) {
     
      cb(null, req.user.username+'--'+req.body.title+'.'+file.mimetype.split('/')[1])
    }
  })
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ storage:storage})
//获取分类列表
router.get('/getCate',action.getGate)


//增加分类
router.post('/addCate',expressJoi(addCate),action.addCate)

//删除分类
router.post('/deleteCate',action.deleteCate)

//根据分类id获取文章
router.post('/getByCate',action.getArticleBycate_id)

//根据用户id获取文章


//发布文章
router.post('/addArticle',upload.single('cover_img'),action.addArticle)






module.exports = router