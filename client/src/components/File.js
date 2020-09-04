import React, { useState, useEffect} from 'react';
import axios from 'axios';
import download from 'js-file-download';

function File({projectId, stageId, stageVersion}) {
    const [files, setFiles] = useState([]);

    /**
     * Get the files for the stage's version.
     * This function is run every time one of the props are changed.
     */
    useEffect(() => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/media/'+projectId+'/'+stageId+'/'+stageVersion)
            .then(res => res.json())
            .then(files => {
                setFiles(files);
            });
    }, [projectId, stageId, stageVersion])

    const onIndividualDownloadHandler = (file_id, filename) => {
        /**
         * Valid Response Types
         * * arraybuffer
         * * blob
         * * document
         * * json
         * * stream
         * * text
         */
        const responseType = 'blob';
        axios({
            url: process.env.REACT_APP_API_SERVER_ADDRESS+'/media/download/file/'+file_id,
            method: 'GET',
            responseType: responseType,
        })
        .then(res => {
            download(res.data, filename, res.headers['content-type'].split(';')[0]);
        });
    }

    const onDownloadAllHandler = () => {
        /**
         * Valid Response Types
         * * arraybuffer
         * * blob
         * * document
         * * json
         * * stream
         * * text
         */
        const responseType = 'blob';
        console.log('Download all');
        axios({
            url: process.env.REACT_APP_API_SERVER_ADDRESS+'/media/download/stage/'+stageId+'/'+stageVersion,
            method: 'GET',
            responseType: responseType,
        })
        .then(res => {
            console.log(res);
            download(res.data, 'stage.zip', res.headers['content-type'].split(';')[0]);
        });
    }

    return (
        <>
        {
            files.length === 0 ?
                <div className="col text-center">
                    <h5 className="pt-2">No Files have been Uploaded</h5>
                    <p>Change Version to see files of other versions</p>
                </div>
            :
            <div className="container">
                <div className="col text-right py-2">
                    <input type="button" value="Download All" className="btn btn-primary" onClick={() => onDownloadAllHandler()}/>
                </div>
                <table className="table table-hover">
                    <tbody>
                        {
                            files.map((file, index) => {
                                const timestamp = new Date(file.created_at);
                                var formattedTimestamp = new Intl.DateTimeFormat('en-AU',{
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                hour: "numeric",
                                minute: "2-digit",
                                second: "2-digit"
                                }).format(timestamp);
                                return (
                                    <tr key={file.file_id}>
                                        <td>{file.original_filename}</td>
                                        <td className="text-right">{formattedTimestamp}</td>
                                        <td className="text-right"><input type="button" value="Download" className="btn btn-primary" onClick={() => onIndividualDownloadHandler(file.file_id, file.original_filename)}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                
                </table>
            </div>
        }
        </>
    )
}

export default File;