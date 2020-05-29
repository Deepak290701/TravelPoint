
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
    .then(() => conn.query("select * from Users"))
    .then(results => console.table(results.rows))
    .then(() => conn.query('INSERT INTO Users(id, name) VALUES ($1,$2)',[8,'Amitabh Bacchan']))
    .then(() => conn.query("select * from Users"))
    .then(results => console.table(results.rows))
    .then(() => conn.query('DELETE FROM Users WHERE id = $1',[8]))
    .then(() => conn.query("select * from Users"))
    // .then(results => console.table(results.rows))
    .then(results => res.send(results.rows))
    .catch(e => console.log(e))
    .finally(() => {conn.end()})
 res.send("hello world!");
});




const port = "3000"
app.listen(process.env.PORT || port,()=>{console.log(`hello world from ${port}`)});
