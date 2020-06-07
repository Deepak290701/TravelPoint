var pg = require('pg')
var PGUSER = 'syfbrmjtdmpwtm'
var PGDATABASE = 'd7q778i7grjqu4'
var config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  password :"51093b60a4b1680d8a25ba146f15c9ccb966d23320bcc3fc319e1824ee0ae4ba",
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 
}

var pool = new pg.Pool(config);

module.exports = pool;