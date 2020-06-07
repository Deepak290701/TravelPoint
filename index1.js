
const express = require('express');
const app = express();
const Client = require('pg').Client;
const pgp = require('pg-promise')
const bodyParser = require('body-parser');
let setConnection = require('./connect').client;
const postRoutes = require('./routes/routes');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',postRoutes.router);
app.use('/login',postRoutes.router);



const port = "3000"
app.listen(port,()=>{console.log(`hello world from ${port}`)});



