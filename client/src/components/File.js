import React, { Component } from 'react'
import axios from 'axios';

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
        axios({
            url: process.env.REACT_APP_API_SERVER_ADDRESS+'/media/download/'+file_id,
            method: 'GET',
            response: 'blob',
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data.folders ? JSON.stringify(res.data) : res.data], {type: res.headers['content-type'].split(';')[0]}));
            const link = document.createElement('a');
            console.log(url);
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        });
    }

    onDownloadAllHandler = () => {

    }

    render() {
        return (
            <div className="container">
                <table>
                    <tbody>
                        <tr>
                            <td className="text-right"><input type="button" value="Download All" className="btn btn-primary"/></td>
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