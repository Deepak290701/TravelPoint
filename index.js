
const express = require('express');
const app = express();
const Client = require('pg').Client;
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));





app.get('/',(req,res) => {
   
const conn = new Client({
    user: "syfbrmjtdmpwtm",
    password :"51093b60a4b1680d8a25ba146f15c9ccb966d23320bcc3fc319e1824ee0ae4ba",
    host : "ec2-34-230-149-169.compute-1.amazonaws.com",
    port:5432,
    database : "d7q778i7grjqu4"
})

conn.connect()
    .then(() => console.log("successful"))
    .then(() => conn.query("select * from user123"))
    .then(results => console.table(results.rows))
    .then(() => conn.query('INSERT INTO user123(id, name) VALUES ($1,$2)',[8,'Amitabh Bacchan']))
    .then(() => conn.query("select * from user123"))
    .then(results => console.table(results.rows))
    .then(() => conn.query('DELETE FROM user123 WHERE id = $1',[8]))
    .then(() => conn.query("select * from user123"))
    // .then(results => console.table(results.rows))
    .then(results => res.send(results.rows))
    .catch(e => console.log(e))
    .finally(() => {conn.end()})
});


app.post('/',(req,res) => {
    const client = new Client({
        user: "postgres",
        password :"a",
        host : "localhost",
        port:5432,
        database : "TravelPoints1"
    })
    if(req.body.id!= null){
        const id = req.body.id;
        const name = req.body.name;
        client.connect()
        .then(() => client.query('INSERT INTO user123(id, name) VALUES ($1,$2)',[id,name]))
        .then(results => res.send(results.rows))
        .catch(e => {
            console.log(e)
        res.send("Data Already exists")
        })
        .finally(() => {client.end()})
    
    }
    else{
        res.send("Data cannot be null") 
    }
    
})


const port = "3000"
app.listen(port,()=>{console.log(`hello world from ${port}`)});




