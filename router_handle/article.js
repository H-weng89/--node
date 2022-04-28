const { result } = require('@hapi/joi/lib/base')
let db = require('../db/index')
//获取分类列表
exports.getGate = (req,res)=>{
    let str = 'select * from article_cate where is_delete=0'
    db.query(str,(err,result)=>{
        if(err){
            return res.send(err)
        }
        res.cc(result,'success',0)
    })

}

//新增文章分类
exports.addCate = (req,res)=>{
    let name = req.body.name
    let str = 'select * from article_cate where name=? and is_delete=0'
    db.query(str,name,(err,result)=>{
        if(err) return res.send(err)
        if(result.length>=1){
            return res.cc({},'分类已存在',1)
        }
        let str2 = 'insert into article_cate set ?'
        db.query(str2,{name},(err,result)=>{
            if(err) return res.send(err)
            if(result.affectedRows==1){
                res.cc({},'success',0)
            }
            
        })
    })

}

//根据id删除分类
exports.deleteCate = (req,res)=>{
    let str = 'select * from article_cate where id = ? and is_delete=0'
    db.query(str,[req.body.id],(err,result)=>{
        if(result.length==0){
            res.send('分类不存在')
        }
        let str = 'update article_cate set is_delete = 1 where id = ?'
        db.query(str,req.body.id,(err,result)=>{
            if(err) return res.send(err)
            if(result.affectedRows=1){
                res.cc({},'success',0)
            }
        })
    })

}

//新增文章
exports.addArticle = (req,res)=>{

    let url = 'http://127.0.0.1:8081/article_img/'+req.user.username+'--'+req.body.title+'.'+req.file.mimetype.split('/')[1]
  let data = {...req.body,cover_img:url,author_id:req.user.id}
  let str = 'insert into article set ?'
  db.query(str,data,(err,result)=>{
      if(err) return res.send(err)
      if(result.affectedRows==1){
          res.cc({},'success',0)
      }
  })
 
}

//根据分类id获取文章
exports.getArticleBycate_id = (req,res)=>{
    console.log(req.body)
    let str = 'select * from article where cate_id = ? and is_delete = 0  '
    db.query(str,req.body.id,(err,result)=>{
        if(err) res.send(err)
    if(result.length>=1){
        res.cc(result,'success',0)
    }
    }) 

}