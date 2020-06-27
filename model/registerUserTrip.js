const setConnectionPool = require('../pool');
const format = require('pg-format');
let validateKey = require('../AESEncrypt')

const registerUserTrip = (req,res) => {
var token = JSON.stringify(req.headers.validateToken);
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
            const distance = req.body.tripDistance;
            const points = req.body.tripPoints;

            if(distance == '' || points=='' || id==''){
                return  res.json({
                    posts : [
                        {statusCode: "3002"},
                        {message: "Trip Fields cannot be blank"},
                        {isSuccessful: "TRUE"},
                        {user: null}
    
                    ]  
                }) 
            }


            const insQuery = format('UPDATE userstrip SET distance = distance + (%L), points = points + (%L) WHERE id = (%L)',
            distance,points,id);

   

            client.query(insQuery,(err,results) => {
                release();   
             

                  res.json({
                    posts : [
                        {statusCode: "3001"},
                        {message: "Trip Saved Successfully"},
                        {isSuccessful: "TRUE"},
                        {user: [
                            {
                                id: req.body.id,
                                results: results
                               
                            }
                        ]}
                    ]
                })
            });
            }           
      });

} 

module.exports ={
    registerUserTrip
}