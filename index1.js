
const express = require('express');
const app = express();
const Client = require('pg').Client;
const pgp = require('pg-promise')
const bodyParser = require('body-parser');
let setConnection = require('./connect').client;
const postRoutes = require('./routes/routes');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


// Handling CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.json({
        statusCode: 200
      })
    }
    next();
});



app.use('/register',postRoutes.router);
app.use('/login',postRoutes.router);
app.use('/',postRoutes.router);
app.use('/registerUserTrip',postRoutes.router)


//Handling all the generic errors if it does not satisfy any route
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
}); 

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        statusCode : error.status,
        error : {
            message : error.message
        }
    })
});




const port = "3000"
app.listen(process.env.PORT || port,()=>{console.log(`hello world from ${port}`)});




