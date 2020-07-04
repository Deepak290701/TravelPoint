
const express = require('express');
const postController = require('../model/registerUser');
const loginController = require('../model/loginUser');
const userTripController = require('../model/registerUserTrip');

const router = express.Router();

router.get('/',(req,res) => {
res.send("hello world!")
});

router.post('/register/v1',postController.registerUser1);
router.post('/login',loginController.loginUser);
router.post('/registerUserTrip',userTripController.registerUserTrip);


//change name to UpdateuSERtRIP

module.exports ={
    router
}   