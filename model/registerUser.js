const setConnectionPool = require('../pool');
const format = require('pg-format');
let validateKey = require('../AESEncrypt')

const registerUser = (req,res) => {
var token =  req.headers['validateToken']; 
console.log(token);
var salt = token.split("_");
// 'fHX4xp6L9IE1YUfCLknn9w==','DcV0VRYa3D48MhvAWj1qtxpHt6TtSbcNAbXX5UfhrSg='

    if(!(validateKey.validate(salt[0],salt[1]))){
        return  res.json({
            posts : [
                {statusCode: "1000"},
                        {message: "Unauthorized Request"},
                        {isSuccessful: "TRUE"},
                {user: null}

            ]  
        })
    }

    setConnectionPool.connect(function (err, client, release) {
        if (err) {
            return  res.json({
                posts : [
                    {statusCode: "1004"},
                    {message: "Something went wrong.Please Try again later"},
                    {isSuccessful: "TRUE"},
                    {user: null}

                ]  
            }) // Error in aquiring connection
          }
        else{
            const id = req.body.id;
            const phoneNumber = req.body.phoneNumber;
            const name = req.body.name;
            const password = req.body.password;
            const countryCode = req.body.countryCode;

            if(phoneNumber == '' || name=='' || password=='' || countryCode==''){
                return  res.json({
                    posts : [
                        {statusCode: "1002"},
                        {message: "Fields cannot be blank"},
                        {isSuccessful: "TRUE"},
                        {user: null}
    
                    ]  
                }) 
            }


            const insQuery = format('INSERT INTO users("phoneNumber",name,password,id,"countryCode") VALUES (%L)',
            [phoneNumber,name,password,id,countryCode]);

            client.query(insQuery,(err,results) => {
                release();

                if (err) {

                    return res.json({
                        posts : [
                        {statusCode: "1003"},
                        {message: "Mobile Number already registered"},
                        {isSuccessful: "TRUE"},
                            {user: null}

                        ]  
                    }) // Error in Executing Query
                  }
                  
      
                  res.json({
                    posts : [
                        {statusCode: "1001"},
                        {message: "Registration is Successful"},
                        {isSuccessful: "TRUE"},
                        {user: [
                            {
                                id: req.body.id,
                                phoneNumber : req.body.phoneNumber,
                                name : req.body.name,
                                password : req.body.password,
                                mobileNo_verified_at: null,
                                created_at:null,
                                updated_at:null,
                                registration_type:null,
                                countryCode : req.body.countryCode
                            }
                        ]}
                    ]
                })
            });

            const insQuery1 = format('INSERT INTO userstrip(id,distance, points) VALUES (%L)',
                  [id,0,0]);
                  client.query(insQuery1,(err,results) => {
                    // release();
                  });

            }           
      });

} 

module.exports ={
    registerUser
}