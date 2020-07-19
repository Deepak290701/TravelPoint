const setConnectionPool = require('../pool');
const format = require('pg-format');
let validateKey = require('../AESEncrypt')
const randomUserId = require('../utils');

class registerUser {

    constructor () {
       
    }
   
   async registerUser1 (req,res) {


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
        
            setConnectionPool.connect(function (err, client, release) {
                if (err) {
                    return  res.json({
                       
                            isSuccessful: true,
                            statusCode: 1004,
                            message: "Something went wrong.Please Try again later",
                            user: null
        
                          
                    }) // Error in aquiring connection
                  }
                else{

                    if(typeof req.body.phoneNumber=='undefined' ||typeof req.body.name=='undefined' || 
                    typeof req.body.password =='undefined' ||typeof req.body.countryCode =='undefined' ){

                        return  res.json({
                          
                                isSuccessful: true,
                                statusCode: 1006,
                                message: "Mandatory values missing",
                                user: null
            
                             
                        }) 

                    }
                    const date = new Date();
                const currDate = date.getDate().toString();
                const currMonth = (date.getMonth+1).toString();
                const currYear = date.getFullYear().toString();
                const currHour = date.getHours().toString();
                const currMinutes = date.getMinutes().toString();
                const currSeconds = date.getSeconds().toString();
                const currMilliseconds = date.getMilliseconds().toString();

                    const id = "User" + currDate+currYear+currHour+currMinutes+currSeconds+currMilliseconds;
                    const phoneNumber = req.body.phoneNumber;
                    const name = req.body.name;
                    const password = req.body.password;
                    const countryCode = req.body.countryCode;



        
                    if(phoneNumber == '' || name=='' || password=='' || countryCode==''){
                        return  res.json({
                          
                                isSuccessful: true,
                                statusCode: 1002,
                                message: "Fields cannot be blank",
                                user: null
            
                              
                        }) 
                    }
        
        
                    const insQuery2 = format('SELECT * FROM users WHERE "phoneNumber" = (%L)',
                    phoneNumber);

                    client.query(insQuery2,(err,results) => {
                        if(typeof results.rowCount != "undefined"){
                            if(results.rowCount>=1){
                                return res.json({
                                    
                                    isSuccessful: true,
                                    statusCode: 1003,
                                    message: "Mobile Number already registered",
                                    user: null
                                })
                            }
                        }
                        else{
                            
                        }
                    

                    })


                    const insQuery = format('INSERT INTO users("phoneNumber",name,password,id,"countryCode") VALUES (%L)',
                    [phoneNumber,name,password,id,countryCode]);
        
                    client.query(insQuery,(err,results) => {
                        release();
        
                        if (err) {
        
                            return res.json({
                                
                                isSuccessful: true,
                                statusCode: 1008,
                                message: "Something went wrong. Try again.",
                                user: null
        
                                
                            }) // Error in Executing Query
                          }
                          
              
                          res.json({
                           
                                isSuccessful: true,
                                statusCode: 1001,
                                message: "Registration is Successful",
                                user: 
                                    {
                                        id: id,
                                        name : req.body.name,
                                        countryCode : req.body.countryCode,
                                        mobileNo : req.body.phoneNumber,
                                        password : req.body.password,
                                        mobileNo_verified_at: null,
                                        created_at:null,
                                        updated_at:null,
                                        
                                    }
                                }
                           
                        )
                    });
        
                    const insQuery1 = format('INSERT INTO userstrip(id,distance, points) VALUES (%L)',
                          [id,0,0]);
                          client.query(insQuery1,(err,results) => {
                            // release();
                          });
        
                    }           
              });
        
        } 

}

 let registerUserObj = new registerUser();
module.exports ={
    registerUserObj
}