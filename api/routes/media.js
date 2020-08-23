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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/media')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({storage: storage}).single('file'); //change to array for multiple file upload

router.get('/:projectId/:stageId/:stageVersion', async(req, res) => {
  var projectId = req.params.projectId;
  var stageId = req.params.stageId;
  var stageVersion = req.params.stageVersion;

  res.status(200).end();
});

router.post('/upload', async(req, res) => {
  try {
    const insertFileQuery = 'INSERT INTO file (path, original_filename, mime, version_id, stage_id, project_id) values (?, ?, ?, ?, ?, ?);';

    //console.log(req)
    upload(req, res, function(err) {
      if(err instanceof multer.MulterError) {
        throw err
      } else if (err) {
        throw err
      }

      pool.query(insertFileQuery, [req.file.path, req.file.originalname, req.file.mimetype, req.body.stage_version, req.body.stage, req.body.project]);

    });
    
    return res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router ;