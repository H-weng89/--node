const express = require('express')
const app = express()
//跨域
const cors = require('cors')
app.use(cors())
//解析数据
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//解析token
const expressJwt = require('express-jwt')
const config = require('./config')
//除了user开头不用token
app.use(expressJwt({secret:config.tokenSecret}).unless({path:[/^\/user\//]}))

//封装res.send

app.use((req,res,next)=>{
    res.cc = (data,msg,status=1)=>{
        res.send({
            data,
            msg,
            status
        })

    }
    next()
})

//注册路由
let user = require('./router/user')
app.use('/user',user)

app.use((err,req,res,next)=>{
    if(err){
        console.log(err)
        return res.cc({},err,1)
    }
})













//监听
app.listen(8081,()=>{
    console.log('api server running at http://127.0.0.1:8081')
})