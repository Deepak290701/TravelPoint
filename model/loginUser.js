const setConnectionPool = require('../pool');
const format = require('pg-format');


const loginUser = (req,res) => {
    setConnectionPool.connect(function (err, client, release) {
        if (err) {
            return  res.json({
                posts : [
                    {status: err.stack},
                    {users: [
                        {
                            phoneNumber:req.body.phoneNumber,
                            password : req.body.password,
                        }
                    ]}

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
                            {status: err.stack},
                            {users: [
                                {
                                    phoneNumber:req.body.phoneNumber,
                                    password : req.body.password,
                                }
                            ]}

                        ]  
                    }) // Error in Executing Query
                  }
                  if(results.rowCount==1){
                    res.json({
                        posts : [
                            {status: "success"},
                            {users: [
                                {
                                    phoneNumber:req.body.phoneNumber, 
                                    password : req.body.password,
                                }
                            ]}
                        ]
                    })
                  }
                  else{
                    res.json({
                        posts : [
                            {status: "Failure"},
                            {users: [
                                {
                                    phoneNumber:req.body.phoneNumber, 
                                    password : req.body.password,
                                }
                            ]}
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