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
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,

    database: process.env.MYSQL_DATABASE,
    
    // If connecting via unix domain socket, specify the path
    //socketPath: process.env.DB_CONNECTION,
    
    // If connecting via TCP, enter the IP and port instead
    host: process.env.MYSQL_HOST_IP,
    port: process.env.MYSQL_PORT,

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
                    'ON user.clearance_id = clearance.clearance_id ';

router.get('/users', async (req, res) => {
  try {
    //Get current acct_value of customer
    const getUserList = getAllUsers +
    'WHERE user.deleted = FALSE;';


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
    const getUser = getAllUsers + ' WHERE user_id=(?);';

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
    const newUserQuery = 'INSERT INTO user (fname,lname,clearance_id,email,password) VALUES (?, ?, ?, ?, ?);';

    await pool.query(newUserQuery, [req.body.fname, req.body.lname, req.body.clearance, req.body.email, req.body.password]);

    res.status(200).end(JSON.stringify({response: 'Successful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

router.post('/users/:userID/update', async (req, res) => {
  try {
    const updateProjectQuery = 'UPDATE user SET fname=(?),lname=(?),clearance_id=(?),email=(?) WHERE user_id=(?)';

    await pool.query(updateProjectQuery, [req.body.fname, req.body.lname, req.body.clearance, req.body.email, req.params.userID]);

    res.status(200).end(JSON.stringify({response: 'Successful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

router.post('/users/:userID/update/password', async (req, res) => {
  try {
    const getCurrentPassword = 'SELECT password FROM user WHERE user_id=(?)';
    const updateProjectQuery = 'UPDATE user SET password=(?) WHERE user_id=(?)';

    var current = await pool.query(getCurrentPassword, [req.params.userID]);

    if(req.body.old_password !== current[0].password){
      console.log("Passwords Don't Match")
      console.log(req.body.old_password, "=> ", current[0].password)
      return res.status(412).json({message: "Incorrect Password"});
    }

    await pool.query(updateProjectQuery, [req.body.new_password, req.params.userID]);

    console.log('Updated Password Successfully!')
    res.status(200).json({message: 'Updated Password Successfully!'});
  } catch (err) {
    console.log('Connection error!');
    res.status(500).json({message: 'Connection error!'});
  }
});

router.get('/users/delete/:userID', async (req, res) => {
  const userID = req.params.userID;

/*   var integer = parseInt(userID, 10);

  console.log(typeof integer, integer)
 */
  try {
    //Get current acct_value of customer
    const deleteQuery = 'UPDATE user SET deleted=1 WHERE user_id='+userID+';';

    console.log(deleteQuery/* , [userID] */)

    //Run query - fetch response
    await pool.query(deleteQuery/* , [integer] */);

    res.status(200).end(JSON.stringify({response: 'Successful!'}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to delete user!');
  }
});

module.exports = router;
