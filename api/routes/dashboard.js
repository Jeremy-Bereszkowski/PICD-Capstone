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

router.get('/:userID', async (req, res) => {
  try {
    const userID = req.params.userID

    //Get current acct_value of customer
    const getProjectsQuery = 'SELECT * FROM project JOIN user_has_project on project.project_id = user_has_project.project_id where user_has_project.user_id = (?);';

    //Run query - fetch response
    var projectList = await pool.query(getProjectsQuery, [userID]);

    res.status(200).json(projectList);
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve projecs!');
  }
});

router.get('/delete/:projectID', async (req, res) => {
  const projectID = req.params.projectID;

  try {
    //Get current acct_value of customer
    const getProjectsQuery = 'DELETE FROM project WHERE project_id=(?);';

    //Run query - fetch response
    await pool.query(getProjectsQuery, [projectID]);

    //console.log(projectList);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve projecs!');
  }
});

module.exports = router;