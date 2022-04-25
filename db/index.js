const mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'nijianWO156.',
    database:'node'
})

module.exports = db