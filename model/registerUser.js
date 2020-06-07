const setConnectionPool = require('../pool');
const format = require('pg-format');


const registerUser = (req,res) => {
    setConnectionPool.connect(function (err, client, release) {
        if (err) {
            return  res.json({
                posts : [
                    {status: err.stack},
                    {users: [
                        {
                            phoneNumber:req.body.phoneNumber,
                            name : req.body.name,
                            password : req.body.password,
                            countryCode : req.body.countryCode
                        }
                    ]}

                ]  
            }) // Error in aquiring connection
          }
        else{
            const phoneNumber = req.body.phoneNumber;
            const name = req.body.name;
            const password = req.body.password;
            const countryCode = req.body.countryCode;
            const insQuery = format('INSERT INTO users("phoneNumber",name,password,"countryCode") VALUES (%L)',
            [phoneNumber,name,password,countryCode]);

            client.query(insQuery,(err,results) => {
                release();
                if (err) {
                    return res.json({
                        posts : [
                            {status: err.stack},
                            {users: [
                                {
                                    phoneNumber:req.body.phoneNumber,
                                    name : req.body.name,
                                    password : req.body.password,
                                    countryCode : req.body.countryCode
                                }
                            ]}

                        ]  
                    }) // Error in Executing Query
                  }
                  res.json({
                    posts : [
                        {status: "success"},
                        {users: [
                            {
                                phoneNumber:req.body.phoneNumber,
                                name : req.body.name,
                                password : req.body.password,
                                countryCode : req.body.countryCode
                            }
                        ]}
                    ]
                })
            });
            }           
      });

} 

module.exports ={
    registerUser
}