'use strict';

const express = require('express');
const multer = require('multer');
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

router.get('/:projectId/:stageId/:stageVersion', async(req, res) => {
  try {
    const getFilesQuery = 'SELECT * FROM `file` WHERE project_id = (?) AND stage_id = (?) AND version_id = (?);';
    var files = await pool.query(getFilesQuery, [req.params.projectId, req.params.stageId, req.params.stageVersion]);

    res.status(200).json(files);
  } catch (error) {
    res.status(500).end('Unable to retreive files');
  }
  

  res.status(200).end();
});

module.exports = router ;