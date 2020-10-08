import React, { useState, useEffect } from 'react';
import axios from 'axios';
import download from 'js-file-download';
import FileHistoryModal from './FileHistoryModal';
import {GetFile} from '../utils/api/index'
import {useAuth0} from "@auth0/auth0-react";

function File({ projectId, stageId, stageVersion, update }) {
    const { getAccessTokenSilently } = useAuth0();
    const [files, setFiles] = useState([]);

    /**
     * Modal Data
     */
    const [showFileHistory, setShowFileHistory] = useState(false);
    const [fileGroup, setFileGroup] = useState([]);

    /**
     * Get the files for the stage's version.
     * This function is run every time one of the props are changed.
     */
    useEffect(() => {
        console.log("Updating")
        GetFile(projectId, stageId, stageVersion, getAccessTokenSilently)
        .then(files => {
            setFiles(files);
        });
    }, [projectId, stageId, stageVersion, update])

    const onIndividualDownloadHandler = async (e, file_id, filename) => {
        const token = await getAccessTokenSilently();

        e.stopPropagation();
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
            url: process.env.REACT_APP_API_SERVER_ADDRESS + '/media/download/file/' + file_id,
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
            url: process.env.REACT_APP_API_SERVER_ADDRESS + '/media/download/stage/' + stageId + '/' + stageVersion,
            method: 'GET',
            responseType: responseType,
        })
            .then(res => {
                console.log(res);
                download(res.data, 'stage.zip', res.headers['content-type'].split(';')[0]);
            });
    }

    /**
     * Groups files by original filename
     */
    const fileGroups = Array.from(new Set(files.map(f => f.original_filename)))
        .map(filename => {
            return files.filter(file => file.original_filename === filename);
        })


    const showHistory = (files) => {
        setFileGroup(files);
        setShowFileHistory(true);
    }

    const hideHistory = () => {
        setShowFileHistory(false);
        setFileGroup([]);
    }

    return (
        <>
            {
                files.length === 0 ?
                    <div className="container">
                        <div className="col text-center">
                            <h5 className="pt-2">No Files have been Uploaded</h5>
                            <p>Change Version to see files of other versions</p>
                        </div>
                    </div>
                    :
                    <div className="container" id="files">
                        <div className="col text-right py-2">
                            <input type="button" value="Download All" className="btn btn-primary" onClick={() => onDownloadAllHandler()} />
                        </div>
                        <table className="table table-hover">
                            <tbody>
                                {
                                    fileGroups.map((group) => {
                                        var files = group.sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1);
                                        var file = files[0];
                                        const timestamp = new Date(file.updated_at);
                                        var formattedTimestamp = new Intl.DateTimeFormat('en-AU', {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            second: "2-digit"
                                        }).format(timestamp);
                                        return (
                                            <tr key={file.file_id} onClick={() => showHistory(files)}>
                                                <td>{file.original_filename}</td>
                                                <td className="text-right">{'v' + files.length}</td>
                                                <td className="text-right">{formattedTimestamp}</td>
                                                <td className="text-right"><input type="button" value="Download" className="btn btn-primary" onClick={(e) => onIndividualDownloadHandler(e, file.file_id, file.original_filename)} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <FileHistoryModal files={fileGroup} show={showFileHistory} hide={() => hideHistory()} handleDownload={onIndividualDownloadHandler}/>
                    </div>
            }

        </>
    )
}

export default File;
