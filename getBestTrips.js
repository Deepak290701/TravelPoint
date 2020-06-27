
 const setConnectionPool = require('../pool');
 const format = require('pg-format');
 
  // 1-> Sam, 2->John 
function updateTrip (id,distance) {

var cars1 = [0,0,0,0,0];

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
 
      const insQuery = format('',);
      client.query(insQuery,(err,results) => {
          release();   
       

            res.json({
              posts : [
                  {statusCode: "3001"},
                  {message: "Trip Saved Successfully"},
                  {isSuccessful: "TRUE"},
                  {user: [
                      {
                         
                      }
                  ]}
              ]
          })
      });
      }           
});




var map = new Map([[1, cars1]]);
console.log(map);
map.get(id).sort();
map.get(id).push(distance);
map.get(id).sort();
map.get(id).splice(0,1);
console.log(map);

}


updateTrip(2,3)
