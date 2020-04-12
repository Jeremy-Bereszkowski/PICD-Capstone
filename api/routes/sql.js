'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// [START cloud_sql_mysql_mysql_create]
let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "test",
    
    // If connecting via unix domain socket, specify the path
    //socketPath: '/cloudsql/paybuddy-jeremy:australia-southeast1:paybuddy-mysql-db',//${process.env.CLOUD_SQL_CONNECTION_NAME}',
    
    // If connecting via TCP, enter the IP and port instead
    host: '127.0.0.1',
    port: 1433,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });
};
createPool();

router.post('/', async (req, res) => {
  
  const custID = req.body.custID;
  const amount = req.body.value;
  const dateStamp = new Date();

  try {
     
    //Create new deposit record
    const depositTableQuery = 'insert into cust_deposit (cust_id, amount, date_stamp) values (?, ?, ?);';

    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from users where cust_id = ' + custID + ';';

    //Run query - fetch response
    var oldAcctValue = await pool.query(getAcctValueQuery);
    var newAcctTotal = oldAcctValue[0].account_value + amount;

    //Get current acct_value of customer
    const setAcctValueQuery = 'update users set account_value=' + newAcctTotal + ' where cust_id=' + custID + ';';

    //Run queries
    await pool.query(depositTableQuery, [custID, amount, dateStamp]);
    await pool.query(setAcctValueQuery);
    
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    res.status(500).send('Unable to successfully insert transaction!').end();
    // [END_EXCLUDE]
  }
  // [END cloud_sql_mysql_mysql_connection]

  res.status(200).send(`Succesfull insertion!`).end();
});

module.exports = router;