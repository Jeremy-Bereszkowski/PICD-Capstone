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

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const getProjectQuery = 'select * from projects where project_id=(?);';

    var project = await pool.query(getProjectQuery, [id]);
    // console.log(project);

    res.status(200).end(JSON.stringify({project: project}));
  } catch (err) {
    console.log(err);
    res.status(500).end('Unable to retrieve Project')
  }
});

router.post('/:id/update', async (req, res) => {
  try {
    const updateProjectQuery = 'UPDATE projects SET title=(?) WHERE project_id=(?)';

    await pool.query(updateProjectQuery, [req.body.title, req.params.id]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});


module.exports = router;