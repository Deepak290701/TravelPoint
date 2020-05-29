
const express = require('express');
const app = express();
const Client = require('pg').Client;
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/',(req,res) => {
   

 res.send("hello world!");
});




const port = "3000"
app.listen(port,()=>{console.log(`hello world from ${port}`)});
