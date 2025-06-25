const express = require('express');
const path = require('path');
const conexao = require('./conexao')
const tabelas = require('./tabelas');
const app = express();


tabelas.init(conexao);

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

const ticketRoutes = require('./routes/ticketsRoutes');
app.use('/tickets',ticketRoutes);

const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

app.listen(3000,()=>console.log('Servidor Rodando'))