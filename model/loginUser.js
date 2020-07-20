const setConnectionPool = require('../pool');
const format = require('pg-format');
let validateKey = require('../AESEncrypt')

class loginUser {

    constructor() {

    }
    async loginUser1 (req,res) {
        setConnectionPool.connect(function (err, client, release) {
    
            var token = req.get('validateToken');
            var salt = token.split("_");

    
    // 'fHX4xp6L9IE1YUfCLknn9w==','DcV0VRYa3D48MhvAWj1qtxpHt6TtSbcNAbXX5UfhrSg='
    
            if(!(validateKey.validate(salt[0].concat(" "),salt[1]))){
                return  res.json({
                    
                        isSuccessful: true,
                        statusCode: 1000,
                        message: "Unauthorized Request",
                        user: null
                })
            }
    
    
            if (err) {
                return  res.json({
                        isSuccessful: true,
                        statusCode: 1004,
                        message: "Something went wrong.Please Try again later",
                        user: null
     
                }); // Error in aquiring connection
              }
            else{

                if(typeof req.body.phoneNumber=='undefined' || 
                typeof req.body.password =='undefined'  ){

                    return  res.json({
                      
                            isSuccessful: true,
                            statusCode: 1006,
                            message: "Mandatory values missing",
                            user: null   
                    }) 

                }
                const phoneNumber = req.body.phoneNumber;
                const password = req.body.password;
                const insQuery = format('SELECT * FROM users WHERE "phoneNumber" = (%L) AND password = (%L)',
                phoneNumber,password);
    
                client.query(insQuery,(err,results) => {
                    release();
                    if (err) {
                        return res.json({
                                isSuccessful: true,
                                statusCode: 1003,
                                message: "This mobile Number is not registered with us. Please Sign Up.",
                                user: null
     
                        }) // Error in Executing Query
                      }
                      if(results.rowCount==1){
                        res.json({
                            
                                isSuccessful: true,
                                statusCode: 1001,
                                message: "Login is Successful",
                                user:
                                
                                {   

                                    name : req.body.name,
                                    countryCode : req.body.countryCode,
                                    mobileNo : req.body.phoneNumber,
                                    password : req.body.password,
                                    mobileNo_verified_at: null,
                                    created_at:null,
                                    updated_at:null,
                                    
                                } 
                                
                            
                        })
                      }
                      else{
                        // res.json({
                         
                        //         isSuccessful: true,
                        //         statusCode: 1002,
                        //         message: "Invalid Mobile Number or Password",
                        //         user: null
                        // })  
                      
                        const insQuery1 = format('SELECT * FROM users WHERE "phoneNumber" = (%L)',
                        phoneNumber,password);

                        client.query(insQuery1,(err,results) => {
                            if(results.rowCount==0){
                                res.json({
                                    
                                        isSuccessful: true,
                                        statusCode: 1003,
                                        message: "This mobile Number is not registered with us. Please Sign Up.",
                                        user:null
                        })
                    
                    }
                    else{
                        res.json({
                                    
                            isSuccessful: true,
                            statusCode: 1002,
                            message: "Invalid Mobile Number or Password",
                            user:null
            })
                    }
                   
                });
                }           
          });
    
    } 
    
}

let loginUserObj = new loginUser();

module.exports ={
    loginUserObj
}