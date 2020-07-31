import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'; //Dropzone Examples and Documentation: https://react-dropzone.js.org/
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import uploadCloud from '../imgs/black_upload_cloud.svg';

import 'react-toastify/dist/ReactToastify.css';
import '../css/UploadFile.css';

function UploadFile({projectId, stageId, stageVersion}) {
    const [files, setFiles] = useState([]);

    const removeFile = (file) => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    }
    
    const removeAllFiles = () => {
        toast.dismiss();
        setFiles([]);
    }

    const onDrop = useCallback(
        (acceptedFiles) => {
            let fileObjs = []
            acceptedFiles.map(file => {
                return fileObjs.push({
                   file: file,
                   progress: 0,
                   status: "success"
                });
            })
            setFiles([...files, ...fileObjs]);
        },
        [files],
    )

    const onDropRejected = useCallback(
        data => {
            data.map(({file, errors}) => {
                return toast.error(`${file.name} - ${errors[0].message}`)
            });
        },
        [],
    )

    const uploadProgress = (file) => (progress) => {
        let percentage = Math.floor((progress.loaded * 100) / progress.total);
        const newFiles = [...files];
        newFiles[newFiles.indexOf(file)].progress = percentage;
        setFiles(newFiles);
    }

    const uploadFile = () => {
        //uploads files one at a time
        for(var x = 0; x < files.length; x++) {
            const data = new FormData();
            data.append('stage_version', stageVersion);
            data.append('stage', stageId);
            data.append('project', projectId);
            data.append('file', files[x].file);
            axios.post(process.env.REACT_APP_API_SERVER_ADDRESS+"/media/upload", data, {
                onUploadProgress: uploadProgress(files[x])
            })
            .catch(err => {
                toast.error(err)
            })
        }

        removeAllFiles();
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
                {files.length > 0 ? 
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





// import React, { Component, useCallback } from 'react';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';
// import {Progress} from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/UploadFile.css';
// import uploadCloud from '../imgs/black_upload_cloud.svg';

//     onClickHandler = () => {
//         const data = new FormData()

//         for(var x = 0; x < this.state.selectedFile.length; x++) {
//             data.append('file', this.state.selectedFile[x])
//         }

//         axios.post("", data, {
//             onUploadProgress: ProgressEvent => {
//                 this.setState({
//                     loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
//                 })
//             }
//         }).then(res => {
//             toast.success('upload success')
//         })
//         .catch(err => {
//             toast.error('upload fail')
//         })
//     }

//     render() {
//         const files = this.state.files.map(file => (
//             <li key={file.name}>
//                 {file.name} - {file.size} bytes
//             </li>
//         ))
//         return (
//             <div className="container">
//                 <Dropzone onDrop={this.onDrop}>
//                             {({getRootProps, getInputProps}) => (
//                             <section className="container">
//                                 <div {...getRootProps({className: ['dropzone']})}>
//                                     <input {...getInputProps()} />
//                                     <p>Drag 'n' drop some files here, or click to select files</p>
//                                     <img src={uploadCloud} alt="Upload"/>
//                                 </div>
//                                 <aside>
//                                     <h4>Files</h4>
//                                     <ul>{files}</ul>
//                                 </aside>
//                             </section>
//                             )}
//                         </Dropzone>
                        
//                 <div className="row">
//                     <div className="col-md">
                    
                        
                    
//                         {/* <form>
//                             <div className={`form-group ${styles.files}`}>
//                                 <input type="file" name="file" id="file" className="form-control" multiple/>
//                             </div>
//                             <div className="form-group">
//                                 <ToastContainer/>
//                                 <div className="progress">
//                                     <Progress max="100" color="success" value={this.state.loadeed}>
//                                         {Math.round(this.state.loaded, 2)} %
//                                     </Progress>
//                                 </div>
//                             </div>
//                             <input type="button" value="Upload" className="btn btn-success" onClick={this.onClickHandler}/>
//                         </form> */}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default UploadFile;