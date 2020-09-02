import React, { Component } from 'react'
import axios from 'axios';
import download from 'js-file-download';

class File extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            projectId: null,
            stageId: null,
            stageVersion: null,
            files: []
        }
    }

    getStageFiles = (projectId, stageId, stageVersion) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/media/'+projectId+'/'+stageId+'/'+stageVersion)
            .then(res => res.json())
            .then(files => {
                this.setState({
                    files: files
                })
            });
    }
    
    componentDidUpdate() {
        if (this.state.projectId !== this.props.projectId || this.state.stageId !== this.props.stageId || this.state.stageVersion !== this.props.stageVersion) {
            this.getStageFiles(this.props.projectId, this.props.stageId, this.props.stageVersion);
            this.setState({
                projectId: this.props.projectId,
                stageId: this.props.stageId,
                stageVersion: this.props.stageVersion
            })
        }
    }

    onIndividualDownloadHandler = (file_id, filename) => {
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

    onDownloadAllHandler = () => {
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
            url: process.env.REACT_APP_API_SERVER_ADDRESS+'/media/download/stage/'+this.state.stageId+'/'+this.state.stageVersion,
            method: 'GET',
            responseType: responseType,
        })
        .then(res => {
            console.log(res);
            download(res.data, 'stage.zip', res.headers['content-type'].split(';')[0]);
        });
    }

    render() {
        return (
            <div className="container">
                <table>
                    <tbody>
                        <tr>
                            <td className="text-right"><input type="button" value="Download All" className="btn btn-primary" onClick={() => this.onDownloadAllHandler()}/></td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-hover">
                    <tbody>
                        {
                            this.state.files.map((file, index) => {
                                return (
                                    <tr key={file.file_id}>
                                        <td>{file.original_filename}</td>
                                        <td className="text-right">{file.created_at}</td>
                                        <td className="text-right"><input type="button" value="Download" className="btn btn-primary" onClick={() => this.onIndividualDownloadHandler(file.file_id, file.original_filename)}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                </table>
            </div>
            
        )
    }
}

export default File;