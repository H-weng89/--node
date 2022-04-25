const joi = require('joi')
//方法更新  npm i joi 

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

let username = joi.string().required()
let password = joi.string().required().pattern(/^[A-Za-z0-9]{6,12}$/)
exports.rule = {
    //表示对req.body中的两个属性进行检验
    body:{
        username,
        password
    }
}