'use strict';

const express = require('express');
const multer = require('multer');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');
const path = require('path');

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/media')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({storage: storage}).single('file'); //change to array for multiple file upload

router.post('/', async(req, res) => {
    try {
        const insertFileQuery = 'INSERT INTO `file` (path, original_filename, mime, version_id, stage_id, project_id) values (?, ?, ?, ?, ?, ?);';

        await upload(req, res, async(err) => {
            if(err instanceof multer.MulterError) {
                throw err
            } else if (err) {
                throw err
            }
  
            try {
                await pool.query(insertFileQuery, [req.file.path, req.file.originalname, req.file.mimetype, req.body.stage_version, req.body.stage, req.body.project]);
            } catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
  
        });
      
      return res.status(200).end();
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
    
  });
  
  module.exports = router ;