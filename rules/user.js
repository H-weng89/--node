const joi = require('joi')
//��������  npm i joi 

/**
 * string() ֵ�������ַ���
 * alphanum() ֵֻ���ǰ��� a-zA-Z0-9 ���ַ���
 * min(length) ��С����
 * max(length) ��󳤶�
 * required() ֵ�Ǳ��������Ϊ undefined
 * pattern(������ʽ) ֵ�������������ʽ�Ĺ���
 */

let username = joi.string().required()
let password = joi.string().required().pattern(/^[A-Za-z0-9]{6,12}$/)
exports.rule = {
    //��ʾ��req.body�е��������Խ��м���
    body:{
        username,
        password
    }
}