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
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,
    
    // If connecting via unix domain socket, specify the path
    //socketPath: process.env.DB_CONNECTION,

    
    // If connecting via TCP, enter the IP and port instead
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });

};
createPool();

const getAllUsers = 'SELECT '+
                      'user_id, '+
                      'fname, '+
                      'lname, '+
                      'clearance, '+/* 
                      'profile, '+ */
                      'email '+/*
                      'password, '+ 
                      'created_at, '+
                      'updated_at '+ */
                    'FROM picd.user '+
                    'JOIN clearance '+
                    'ON user.clearance_id = clearance.clearance_id';

router.get('/users', async (req, res) => {
  try {
    //Get current acct_value of customer
    const getUserList = getAllUsers + ';';


    //Run query - fetch response
    var userList = await pool.query(getUserList);

    res.status(200).json(userList);
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve users!');
  }
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    //Get current acct_value of customer
    const getUser = getAllUsers + ' where user_id=(?);';

    //Run query - fetch response
    var user = await pool.query(getUser, [id]);

    res.status(200).end(JSON.stringify({user: user[0]}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve user!');
  }
});

router.post('/users/new', async (req, res) => {
  console.log(req.body.fname, req.body.lname, req.body.clearance, req.body.email, req.body.password)
  try {
    const newUserQuery = 'insert into user (fname,lname,clearance_id,email,password) values (?, ?, ?, ?, ?);';

    await pool.query(newUserQuery, [req.body.fname, req.body.lname, req.body.clearance, req.body.email, req.body.password]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

router.post('/users/:userID/update', async (req, res) => {
  try {
    const updateProjectQuery = 'UPDATE user SET fname=(?),lname=(?),clearance_id=(?),email=(?) WHERE user_id=(?)';

    await pool.query(updateProjectQuery, [req.body.fname, req.body.lname, req.body.clearance, req.body.email, req.params.userID]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

router.get('/users/delete/:userID', async (req, res) => {
  const userID = req.params.userID;

  try {
    //Get current acct_value of customer
    const deleteQuery = 'delete from user where user_id=(?);';

    //Run query - fetch response
    await pool.query(deleteQuery, [userID]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to delete user!');
  }
});

module.exports = router;