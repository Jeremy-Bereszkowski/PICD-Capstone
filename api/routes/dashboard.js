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

router.get('/', async (req, res) => {
  try {
    //Get current acct_value of customer
    const getProjectsQuery = 'select * from projects;';

    //Run query - fetch response
    var projectList = await pool.query(getProjectsQuery);

    function compare(a, b) {
      const bandA = a.date_stamp;
      const bandB = b.date_stamp;

      let comparison = 0;
      if (bandA > bandB) {
      comparison = 1;
      } else if (bandA < bandB) {
      comparison = -1;
      }
      return comparison * -1;
    }
    
    projectList.sort(compare);

    //console.log(projectList);

    res.end(JSON.stringify({projectList: projectList}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve projecs!');
  }
});

router.get('/delete/:projectID', async (req, res) => {
  const projectID = req.params.projectID;

  try {
    //Get current acct_value of customer
    const getProjectsQuery = 'delete from projects where project_id=(?);';

    //Run query - fetch response
    await pool.query(getProjectsQuery, [projectID]);

    //console.log(projectList);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve projecs!');
  }
});

router.get('/project/:projectID', async (req, res) => {
  const projectID = req.params.projectID;

  try {
    const getProjectQuery = 'select project from projects where project_id=(?)';

    var project = await pool.query(getProjectQuery, [projectID]);

    res.status(200).end(JSON.stringify({project: project}));
  } catch (err) {
    console.log(err);
    res.status(500).end('Unable to retrieve Project')
  }
});

module.exports = router;