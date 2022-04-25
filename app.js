const express = require('express')
const app = express()
//����
const cors = require('cors')
app.use(cors())
//��������
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//����token
const expressJwt = require('express-jwt')
const config = require('./config')
//����user��ͷ����token
app.use(expressJwt({secret:config.tokenSecret}).unless({path:[/^\/user\//]}))

//��װres.send

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

//ע��·��
let user = require('./router/user')
app.use('/user',user)

app.use((err,req,res,next)=>{
    if(err){
        console.log(err)
        return res.cc({},err,1)
    }
})













//����
app.listen(8081,()=>{
    console.log('api server running at http://127.0.0.1:8081')
})