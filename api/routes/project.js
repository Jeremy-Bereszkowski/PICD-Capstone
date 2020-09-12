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

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const getProjectQuery = 'select * from project where project_id=(?);';

    var project = await pool.query(getProjectQuery, [id]);
    // console.log(project);

    res.status(200).end(JSON.stringify({project: project[0]}));
  } catch (err) {
    res.status(500).end('Unable to retrieve Project');
  }
});

router.get('/:id/users', async(req, res) => {
  try {
    const getProjectsUsersQuery = 'SELECT user.user_id, user.fname, user.lname, collaboration.privilege ' +
      'FROM user JOIN user_has_project ON user_has_project.user_id = user.user_id ' +
      'JOIN collaboration ON user_has_project.collaboration_id = collaboration.collaboration_id  ' +
      'WHERE user_has_project.project_id=(?);';
    var projectUsers = await pool.query(getProjectsUsersQuery, [req.params.id])

    res.status(200).end(JSON.stringify({projectUsers: projectUsers}));
  } catch (err) {
    console.log(err)
    res.status(500).end(err);
  }
});

router.get('/:id/stages', async(req, res) => {
  try {
    const getStages = 'SELECT * FROM stage WHERE project_id=(?);';
    var stages = await pool.query(getStages, [req.params.id]);

    res.status(200).json(stages);
  } catch (err) {
    res.status(500).end('Unable to retrieve Project');
  }
});

/**
 * Update project details
 */
router.post('/:id/update', async (req, res) => {
  try {
    const updateProjectQuery = 'UPDATE project SET title=(?), description=(?) WHERE project_id=(?);';

    await pool.query(updateProjectQuery, [req.body.title, req.body.description, req.params.id]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!');
  }
});

/**
 * Add project collaborator
 */
router.post('/:id/add-user/:uid', async(req, res) => {
  try {
    const addUserToProjectQuery = 'INSERT INTO `user_has_project` (user_id, project_id, collaboration_id) VALUES (?, ?, ?);';

    var collabId;

    switch (req.body.collabId.toLowerCase()) {
      case 'read':
        collabId = 1;
        break;
      case 'write':
        collabId = 2;
        break;
        case 'admin':
        collabId = 3;
        break;
    }

    await pool.query(addUserToProjectQuery, [req.params.uid, req.params.id, collabId]);

    res.status(200).end(JSON.stringify({success: true}));
  } catch(err) {
    res.status(500).json({success: false, message: err.message})
  }
});

/**
 * Remove project collaborator
 * Cannot remove project owner
 */
router.get('/:id/remove-user/:uid', async(req, res) => {
  try {
    const removeUserFromProjectQuery = 'DELETE FROM user_has_project WHERE project_id=(?) AND user_id=(?);';

    await pool.query(removeUserFromProjectQuery, [req.params.id, req.params.uid]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!');
  }
})

router.post('/new/:userID', async (req, res) => {
  try {
    const userID = req.params.userID

    const insertProjectQuery = 'INSERT INTO project (owner, title, description) values (?, ?, ?);';
    const insertUserProjectQuery = 'INSERT INTO user_has_project (user_id, project_id, collaboration_id) VALUES (?, ?, ?);'
    const insertStages = 'INSERT INTO stage (project_id, name) VALUES (?, "Design"), (?, "Simulation"), (?, "Layout"), (?, "Test");';

    var project = await pool.query(insertProjectQuery, [userID, req.body.title, req.body.description]);
    await pool.query(insertUserProjectQuery, [userID, project.insertId, 3])
    await pool.query(insertStages, [project.insertId, project.insertId, project.insertId, project.insertId])

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    console.log(err)
    res.status(500).send('Connection error!');
  }
});

router.get('/:projectId/stage/:stageId', async(req, res) => {
  try {
    const getStage = 'SELECT * FROM stage WHERE stage_id=(?);';
    var stage = await pool.query(getStage, [req.params.stageId]);

    res.status(200).json(stage[0]);
  } catch (err) {
    res.status(500).send('Connection error!');
  }
});

module.exports = router;
