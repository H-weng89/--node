let db  = require('../db/index')
const bcrypt = require('bcryptjs')
const config = require('../config')
const jwt = require('jsonwebtoken')
exports.register = (req,res)=>{
  let data  = req.body

  let str = 'select * from user where username=?'
  db.query(str,data.username,(err,result)=>{
      if(err){
          return res.cc({},err,1)
      }
      if(result.length>0){
         return  res.cc({},'用户名已存在',1)
      }
      //用户可用
      data.password = bcrypt.hashSync(data.password,10)

      let insertStr = 'insert into user set ?'
      db.query(insertStr,{username:data.username,password:data.password},(err,result)=>{
          if(err){
              return res.cc({},err,1)
          }
           if(result.affectedRows!=1){
               return res.cc({},'注册失败',1)

           }
           res.cc({},'注册成功',0)
      })

  })
    
}

exports.login = (req,res)=>{
     let data = req.body
     let searchStr = 'select * from user where username =?'
     db.query(searchStr,data.username,(err,result)=>{
         if(err){
             return res.cc({},err,1)
         }
         if(result.length!=1){
             return res.cc({},'登录失败',1)
         }
         //比较加密后的密码
         let isRight = bcrypt.compareSync(data.password,result[0].password)
         if(!isRight){
             return res.cc({},'密码错误',1)

         }
         //生成token....
         const user = {...result[0],password:'',user_pic:''}  //重置passowrd属性
        let token = jwt.sign(user,config.tokenSecret,{expiresIn:'2h'})
        res.cc({token:'Bearer '+token},'登录成功',0)         

     })
}