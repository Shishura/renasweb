const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host:'localhost',
    database:'devweb',
    user:'root',
    password:'root',
    port:3006,
});

module.exports=conexao