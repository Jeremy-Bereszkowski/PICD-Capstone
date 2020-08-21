import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import UploadFile from '../../components/UploadFile'
import NewVersionModal from '../../components/NewVersionModal'
import '../../css/stage.css'


class Stage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            err: "",
            stageId: null,
            versions: [],
            selectVersion: "",
            showModal: false
        }
    }

    getStageData(projectId, stageId) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/" + projectId + '/stage/' + stageId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    name: res.name,
                    stageId: stageId
                })
            });
    }

    getVersionData(projectId, stageId) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/version/" + projectId + '/' + stageId)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    versions: res,
                    selectVersion: res[res.length - 1]
                })
            });
    }

    componentDidMount() {
        this.getStageData(this.props.match.params.projectId, this.props.match.params.stageId);
        this.getVersionData(this.props.match.params.projectId, this.props.match.params.stageId);
    }

    componentDidUpdate() {
        if (this.props.match.params.stageId !== this.state.stageId) {
            this.getStageData(this.props.match.params.projectId, this.props.match.params.stageId);
            this.getVersionData(this.props.match.params.projectId, this.props.match.params.stageId);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var newRevisionName = event.target.title.value
        
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/version/new/"+this.props.match.params.projectId+'/'+this.state.stageId, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                newRevisionName: newRevisionName
            })
        }).then((res) => {
            window.location.href = "/project/"+this.props.match.params.projectId+"/stage/"+this.state.stageId
        })
        
        console.log(newRevisionName, "hellotho")
    }

    render() {
        return (
            <div className="row justify-content-left content">
                <Sidebar id={this.props.match.params.projectId} />
                <div className="col">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>
                                Stage: {this.state.name}
                            </h3>
                        </div>
                        <div className="col-md-6">

                            <div className="float-right">
                                <select value={this.state.selectVersion}
                                    onChange={(e) => this.setState({ selectVersion: e.target.value })}>
                                    {this.state.versions.map((version) => <option key={version.version_id} value={version.version_id}>{version.revision}: {version.name}</option>)}
                                </select>

                                {<NewVersionModal handleSubmit={this.handleSubmit}/>}
                            </div>

                        </div>
                    </div>
                    <hr />
                    <UploadFile projectId={this.props.match.params.projectId} stageId={this.state.stageId} stageVersion={1} />
                </div>
            </div>
        )
    }
}

export default Stage