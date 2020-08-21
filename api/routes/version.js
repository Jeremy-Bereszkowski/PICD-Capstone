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

router.get('/:projectId/:stageId/', async(req, res) => {
  try {
    const getStage = 'SELECT * FROM version WHERE stage_id=(?) order by revision desc;';
    var stage = await pool.query(getStage, [req.params.stageId]);

    res.status(200).json(stage);
  } catch (err) {
    res.status(500).send('Connection error!');
  }
});

router.post('/new/:projectId/:stageId/', async(req, res) => {
  try {
    var projectID = req.params.projectId
    var stageID = req.params.stageId
    var newRevisionName = req.body.newRevisionName

    const getVersions = 'SELECT * FROM version WHERE stage_id=(?);';
    var versions = await pool.query(getVersions, [stageID]);

    var newRevision = versions.length + 1

    const insertVersionQuery = "insert into version (stage_id, project_id, revision, name) values (?,?,?,?);";

    await pool.query(insertVersionQuery, [parseInt(stageID, 10), parseInt(projectID, 10), newRevision, newRevisionName])

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    console.log(err)
    res.status(500).send('Connection error!');
  }
});

module.exports = router;