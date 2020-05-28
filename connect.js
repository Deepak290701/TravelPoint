const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password :"a",
    host : "localhost",
    port:5432,
    database : "TravelPoints1"
})

const connect  = () => {
  return new Client({
    user: "postgres",
    password :"a",
    host : "localhost",
    port:5432,
    database : "TravelPoints1"
})  
}

module.exports = {
    client,connect
}