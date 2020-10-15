import React, {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'; // Dropzone Examples and Documentation: https://react-dropzone.js.org/
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; // Used for uploading the files to the api server

import uploadCloud from '../imgs/black_upload_cloud.svg';

import 'react-toastify/dist/ReactToastify.css';
import '../css/UploadFile.css';
import {useAuth0} from "@auth0/auth0-react";

function UploadFile({projectId, stageId, stageVersion, uploadComplete}) {
    const { getAccessTokenSilently } = useAuth0();

    const [files, setFiles] = useState([]);
    const [upload, setUpload] = useState(false); //used to indecate when the upload button has been pressed and the uploading is about to commense

    useEffect(() => {
        setFiles([]);
    }, [projectId, stageId, stageVersion])

    /**
     * Removes a particular file from the files list.
     * 
     * @param {*} file 
     */
    const removeFile = (file) => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    }
    
    /**
     * Removes all the files in the files list that havent been uploaded.
     */
    const removeAllFiles = () => {
        toast.dismiss();
        const newFiles = [...files];
        files.forEach(file => {
            if(file.progress !== 100) {
                newFiles.splice(newFiles.indexOf(file), 1);
            }
        })
        setFiles(newFiles);
    }

    /**
     * This callback is called when a droped file is accepted according to the dropzone settings
     */
    const onDrop = useCallback(
        (acceptedFiles) => {
            let fileObjs = []
            acceptedFiles.forEach(file => {
                fileObjs.push({
                   file: file,
                   progress: 0,
                   status: "success"
                });
            })

            setFiles([...files, ...fileObjs]);
            setUpload(false);
        },
        [files],
    )
    
    /**
     * This callback is called when a droped files in is rejected according to the dropzone settings
     */
    const onDropRejected = useCallback(
        data => {
            data.forEach(({file, errors}) => {
                toast.error(`${file.name} - ${errors[0].message}`)
            });
        },
        [],
    )
    
    /**
     * Updates the progress bar for the file that is currently being uploaded asynchronously.
     * 
     * @param {*} file 
     */
    const uploadProgress = (file) => (progress) => {
        let percentage = Math.floor((progress.loaded * 100) / progress.total);
        const newFiles = [...files];
        newFiles[newFiles.indexOf(file)].progress = percentage;
        setFiles(newFiles);
    }

    /**
     * Upload the files to the API Server using axios.
     * 
     * Currently it uploads them one by one so that the progress of each file can be tracked
     * for the loading bars.
     */
    const uploadFile = async () => {
        setUpload(true);

        const token = await getAccessTokenSilently();

        await Promise.all(files.map(async (file) => {
            if(file.progress !== 100) {
                const data = new FormData();
                data.append('stage_version', stageVersion);
                data.append('stage', stageId);
                data.append('project', projectId);
                data.append('file', file.file);
                await axios.post(process.env.REACT_APP_API_SERVER_ADDRESS+"/media/upload", data, {
                    onUploadProgress: uploadProgress(file),
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .catch(err => {
                    toast.error(err)
                })
            }
            return true;
        })).then(() => {
            uploadComplete()
        })
    }

    //print a list of all the files
    const filesList = files.map((file, index) => (
        <div className="row justify-content-center pt-1" key={index} id={index}>
            <div className="col align-self-center">
                {file.file.path}
            </div>
            <div className="col-auto align-self-center">
                {file.file.size} bytes
            </div>
            {file.progress > 0 ?
            <div className="col-3 align-self-center">
                <Progress id={file.file.name} max="100" color={file.status} value={file.progress}>
                    {Math.round(file.progress, 2)} %
                </Progress>
            </div> : null}
            {file.progress > 0 ? null :
            <div className="col-auto align-self-center">
                <button className="btn btn-warning" onClick={() => removeFile(file)}>Cancel</button>
            </div>}
        </div>
    ));
    
    /**
     * Settings for the dropzone
     */
    const {
        getRootProps, 
        getInputProps, 
        isDragActive,
    } = useDropzone({
        accept: '', //Leaving the accepted files blank means that all files are accepted.
        maxSize: 20000000, //20MB file
        onDropRejected,
        onDrop,
    });

    return (
        <section className="container">
            <div className="row">
                <div className="col">
                    <div {...getRootProps({className: `dropzone ${isDragActive ? 'dropzoneDagActive' : ''} pointer`})}>
                        <ToastContainer/>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <img src={uploadCloud} alt="Upload"/>
                    </div>
                </div>
            </div>
            <aside className="pt-1">
                {filesList}
                {files.length > 0  && !upload? 
                <div className="row justify-contnet-right pt-1">
                    <div className="col text-right">
                        <input type="button" value="Cancel All" className="btn btn-warning mr-1" onClick={removeAllFiles}/>
                        <input type="button" value="Upload" className="btn btn-success" onClick={uploadFile}/>
                    </div>
                </div> : ''}
            </aside>
        </section>
    )
}

export default UploadFile;
