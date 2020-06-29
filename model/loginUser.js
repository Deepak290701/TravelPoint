const setConnectionPool = require('../pool');
const format = require('pg-format');
let validateKey = require('../AESEncrypt')

const loginUser = (req,res) => {
    setConnectionPool.connect(function (err, client, release) {

        var token = JSON.stringify(req.headers.validateToken);
        var salt = token.split("_");


        var token =  req.get('validateToken');
        
if(!(token.length==69)){

    return  res.json({
        posts : [
            {statusCode: "1005"},
                    {message: "Invalid Token"},
                    {isSuccessful: "TRUE"},
            {user: null}

        ]  
    })


}

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


        if (err) {
            return  res.json({
                posts : [
                    {statusCode: "1004"},
                    {message: "Something went wrong.Please Try again later"},
                    {isSuccessful: "TRUE"},
                    {user: null}

                ]  
            }); // Error in aquiring connection
          }
        else{
            const phoneNumber = req.body.phoneNumber;
            const password = req.body.password;
            const insQuery = format('SELECT * FROM users WHERE "phoneNumber" = (%L) AND password = (%L)',
            phoneNumber,password);

            client.query(insQuery,(err,results) => {
                release();
                if (err) {
                    return res.json({
                        posts : [
                            {statusCode: "1005"},
                            {message: "Mobile number is not registered.Please click SignUp"},
                            {isSuccessful: "TRUE"},
                            {user: null}

                        ]  
                    }) // Error in Executing Query
                  }
                  if(results.rowCount==1){
                    res.json({
                        posts : [
                            {statusCode: "1001"},
                            {message: "Login is Successful"},
                            {isSuccessful: "TRUE"},
                            {user:
                            [
                            {   id: req.body.id,
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
                  }
                  else{
                    res.json({
                        posts : [
                            {statusCode: "1002"},
                            {message: "Invalid Mobile Number or Password"},
                            {isSuccessful: "TRUE"},
                            {user: null}
                        ]
                    })  
                  }
               
            });
            }           
      });

} 

module.exports ={
    loginUser
}