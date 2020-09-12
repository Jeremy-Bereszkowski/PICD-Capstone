'use strict';

const express = require('express');
const multer = require('multer');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');
const JSZip = require('jszip');
const fs = require('fs');
var path = require('path');
const os = require('os');

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

/**
 * Project File Downoad
 */
router.get('/project/:projectID', async(req, res) => {
    // TODO: zip and download the entire project
});

/**
 * Stage File Download
 */
router.get('/stage/:stageID/:stageVersion', async(req, res) => {
    const getFilesQuery = 'SELECT * FROM `file` f ' +
                            'WHERE NOT EXISTS ( '+
                            'SELECT 1 FROM `file` f2 '+
                            'WHERE f.original_filename = f2.original_filename '+
                            'AND f.mime = f2.mime '+
                            'AND f.version_id = f2.version_id '+
                            'AND f.updated_at < f2.updated_at '+
                        ') '+
                        'AND stage_id = (?) '+
                        'AND version_id = (?);';
    const getStageDetails = 'SELECT * FROM `stage` WHERE stage_id = (?);';
    const getVersionDetails = 'SELECT * FROM `version` WHERE version_id = (?);';

  try {
    
    var zip = new JSZip();

    var filesQuery = pool.query(getFilesQuery, [req.params.stageID, req.params.stageVersion]);
    var stageQuery = pool.query(getStageDetails, req.params.stageID);
    var versionQuery = pool.query(getVersionDetails, req.params.stageVersion);
    var [files, stage, version] = await Promise.all([filesQuery, stageQuery, versionQuery]);
    
    console.log('Stage Name => ', stage[0].name);

    var folder = zip.folder(stage[0].name+'-R'+version[0].revision+'-'+version[0].name);
    files.map(file => {
        //console.log(file.original_filename, ' => ', file.path);
        folder.file(file.original_filename, fs.readFileSync(file.path));
    });
    
    var dir = path.join('public', 'media');
    var zipFileName = path.join(dir, stage[0].name+'-'+stage[0].stage_id+'-'+version[0].revision+'.zip');

    zip.generateNodeStream({
        streamFiles: true
    })
    .pipe(fs.createWriteStream(zipFileName))
    .on('finish', () => {
        console.log('Zipped => ', zipFileName);
        res.download(zipFileName, (err) => {
            if(err) {
                console.log(err);
            }

            //Delete the zipped file after downloading or error
            fs.unlink(zipFileName, () => {
                console.log('Deleted => '+zipFileName);
            })
        });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

/**
 * Individual File Download
 */
router.get('/file/:fileID', async(req, res) => {
    const getFileQuery = 'SELECT * FROM `file` WHERE file_id = (?);';  
    try {
        var fileData = await pool.query(getFileQuery, [req.params.fileID]);
        // console.log(fileData);
        // var options = {
        //     headers: {
        //         'x-timestamp': Date.now(),
        //         'x-sent': true,
        //         'content-disposition': "attachment; filename=" + fileData[0].original_filename,
        //     }
        // }

        res.download(fileData[0].path, fileData[0].original_filename);
        console.log("File: "+fileData[0].original_filename+" sent successfully");
    } catch (error) {
        console.error("File could not be sent: "+ error);
        next(error);
    }
    
  });

module.exports = router ;