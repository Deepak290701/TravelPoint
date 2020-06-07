
const express = require('express');
const postController = require('../model/registerUser');
const loginController = require('../model/loginUser');

const router = express.Router();

router.get('/',(req,res) => {
res.send("hello world!")
});
router.post('/register',postController.registerUser);
router.post('/login',loginController.loginUser);

module.exports ={
    router
}   