const db  = require('../db/index')
const bcrypt = require('bcryptjs')
const path = require('path')
exports.getInfo = (req,res)=>{
    let searchStr = 'select * from user where id=?'
    db.query(searchStr,req.user.id,(err,result)=>{
        if(err) return res.cc({},err,1)
        if(result.length!=1){
            return res.cc({},'未知错误',1)
        }
         let data = {...result[0],password:''}
         res.cc(data,'查询成功',0)
    })
   
   


}

exports.update = (req,res)=>{
    let updateStr = 'update user set ? where id=?'
  
    db.query(updateStr,[req.body,req.user.id],(err,result)=>{
        if(err) return res.send(err)
        if(result.affectedRows!=1) return res.send('未知错误')
        res.cc({},'success',0)
    })

}

exports.updatepwd = (req,res)=>{
    let data = req.body
    let str = 'select * from user where id = ?'
     db.query(str,req.user.id,(err,result)=>{
         if(err) return res.send(err)
         if(result.length!=1){
             return res.cc({},'错误',1)
         }
         let isRight = bcrypt.compareSync(req.body.oldPwd,result[0].password)
         if(isRight){
             let password = bcrypt.hashSync(data.newPwd,10)
             let updateStr = 'update user set password = ? where id = ?'
             db.query(updateStr,[password,req.user.id],(err,result)=>{
                 if(err) return res.send(err)
                 if(result.affectedRows==1){
                     return res.cc({},'success',0)
                 }
             })
         }
     })
}

exports.avatar = (req,res)=>{
    console.log(req.file)
  
    let str = 'update user set user_pic = ? where id = ?'
    let url = path.join(' http://127.0.0.1:8081/user/avatar',req.file.filename)
    db.query(str,[url,req.user.id],(err,result)=>{
        if(err) return res.send(err)
        if(result.affectedRows==1){
            res.cc({},'success',0)
        }
    })

    

}