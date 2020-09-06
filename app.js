const express = require('express');

const app = express();

const port = 8080;

const bodyParser = require('body-parser');

// ==> CONFG.BODYPARSER <==
app.use(bodyParser.urlencoded({extended:true}));

// ==> EGINE VIEW <==
app.set('view engine', 'ejs');


// ==>CONNECTION BD <==
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'joaoOne',
    password: '123456',
    database: 'test'
});

conn.connect ((err)=>{
    //Se ocorrer algum erro com a conexao
    if(err){
        console.error('error connecting:'+ err.stack);
        return
    }
    console.log('connected as id' + conn.threadId);
});
// ==> END CONECTION <==


// ==> ROTAS <==
app.get('/home',(req,res)=>{
    res.render('index');
});

app.get('/cadastro',(req,res)=>{
    res.render('cadastro')
})

app.post('/registro',(req,res)=>{
    const query = `INSERT INTO user(
        nome,
        sobreNome,
        email 
        ) VALUES (?,?,?);   
    `
    const values = [
        req.body.name,
        req.body.sobreNome,
        req.body.email
    ]
    conn.query(query,values,function(err,result){
        if(!err){
            console.log('Usuario cadastrado');
        }else{
            console.log('Erro:Não foi possivel Realizar o cadastro' + err.stack)
        }
    })
    res.redirect('/home')
})

app.get('/cadUser',function(req,res){
    conn.query('SELECT * FROM user',function(err,rows){
        const reserved = [...rows].reverse();
        return res.render('cadUser',{cadUser:reserved});
    })
})


// ==> SERVER <==
app.listen(port,err =>{
    console.log("Servidor esta rodando")
})