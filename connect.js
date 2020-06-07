const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password :"a",
    host : "localhost",
    port:5432,
    database : "TravelPoints1"
})

const cn = {
    host: "localhost", // server name or IP address;
    port: 5432,
    database: "TravelPoints1",
    user: "postgres",
    password: "a"
};

module.exports = {
    client,cn
}