'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "picd_capstone_test",
    
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

router.post('/login', async (req, res) => {

  try {
     
    //Create new deposit record
    const getUserDetails = 'select password, clearance from users where email="' + req.body.uname + '";';

    //Run query - fetch response
    var userDetails = await pool.query(getUserDetails);

    if (userDetails.length < 1) {
      res.status(403).send({message: 'Unkown E-Mail'}).end();
    }
    else if (userDetails[0].password === req.body.pword) {
      res.status(200).send(userDetails[0].clearance).end();
    }
    else {
      res.status(403).send({message: 'Incorrect Password'}).end();
    }
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

module.exports = router;