const express = require('express')
const app = express()

app.use('/user/avatar',express.static('./avatar')) //根据返回的路径
app.use('/user/article_img',express.static('./article_img'))
app.use('/public',express.static('./public'))

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const expressJwt = require('express-jwt')
const config = require('./config')

app.use(expressJwt({secret:config.tokenSecret}).unless({path:[/(\/{1,2}user\/)*(\/public)*/]}))

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

//引入路由
let user = require('./router/user')
app.use('/user',user)
let article = require('./router/article')
app.use('/article',article)
let userInfo = require('./router/userInfo')
app.use('/my',userInfo)

app.use((err,req,res,next)=>{
    if(err){
        if (err.name === 'UnauthorizedError') return res.send('身份验证失败')

        console.log(err)
        return res.cc({},err.message?err.message:err,1)
    }
})













//����
app.listen(8085,()=>{
    console.log('api server running at http://127.0.0.1:8085/public/apidoc')
})