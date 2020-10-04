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
 * Transfer project ownership
 */
router.post('/transfer', async(req, res) => {
  try {
    const newOwnerId = req.body.newOwnerId;
    const oldOwnerId = req.body.oldOwnerId;
    const projectId = req.body.projectId;

    const updateProjectQuery = 'UPDATE project SET owner=(?) WHERE project_id=(?);';
    const updateUserHasProjectQuery1 = 'UPDATE user_has_project SET collaboration_id=2 WHERE project_id=(?) AND user_id=(?);';
    const updateUserHasProjectQuery2 = 'UPDATE user_has_project SET collaboration_id=3 WHERE project_id=(?) AND user_id=(?);';

    await pool.query(updateProjectQuery, [newOwnerId, projectId]);
    await pool.query(updateUserHasProjectQuery1, [projectId, oldOwnerId]);
    await pool.query(updateUserHasProjectQuery2, [projectId, newOwnerId]);

    res.status(200).json(JSON.stringify({isSuccess: true}));
  } catch (err) {
    res.status(500).send('Connection error!');
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

router.post('/:projectId/stage/new', async(req, res) => {
  try {
    const insertStage = 'INSERT INTO stage (project_id, name) VALUES (?, ?);';
    const insertVersion = 'INSERT INTO version (stage_id, project_id, revision, name) VALUES (?, ?, ?, ?);';
    const projectPrivilege = 'SELECT * FROM `user_has_project` WHERE user_id=(?) and project_id=(?);';

    var privilege = await pool.query(projectPrivilege, [req.body.userID, req.body.projectID]);
    
    if(privilege.length == 0) {
      return res.status(500).json({message: 'Invalid User ID or Project ID'});
    }

    if(privilege[0].collaboration_id === 2 || privilege[0].collaboration_id === 3) {
      var stage = await pool.query(insertStage, [req.body.projectID, req.body.stageName]);
      await pool.query(insertVersion, [stage.insertId, req.body.projectID, 1, 'init']);
      return res.status(200).json({message: "New Stage Create Successfully!"});
    } else {
      return res.status(500).json({message: 'Invalid Privilege'});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Unable to Create New Stage!"});
  }
})


router.post('/stage/delete', async(req, res) => {
  try {
    const getStage = 'SELECT u.user_id, u.collaboration_id, s.project_id, s.stage_id FROM stage AS s ' +
                     'JOIN user_has_project as u ' +
                     'ON u.project_id = s.project_id ' +
                     'WHERE s.stage_id=(?) AND u.user_id=(?)';
    const deleteStage = 'DELETE FROM stage WHERE project_id=(?) AND stage_id=(?);';

    var stage = await pool.query(getStage, [req.body.stageID, req.body.userID])

    if (stage.length === 0) {
      return res.status(500).end(JSON.stringify({message: 'Unable to find Stage or Invalid Collaboration Privileges'}))
    }

    if(stage.collaboration_id < 2) {
      return res.status(500).end(JSON.stringify({message: 'Invalid Collaboration Privileges'}))
    }

    await pool.query(deleteStage, [req.body.projectID, req.body.stageID])

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));

  } catch (error){
    res.status(500).json({message: "Unable to Delete Stage"})
  }
})
module.exports = router;
