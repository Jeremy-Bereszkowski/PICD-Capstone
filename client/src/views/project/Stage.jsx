import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import UploadFile from '../../components/UploadFile'
import File from '../../components/File'

class Stage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            err: "",
            stageId: null
        }
    }

    getStageData(projectId, stageId) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectId+'/stage/'+stageId)
        .then(res => res.json())
        .then(res => {
            this.setState({
                name: res.name,
                stageId: stageId,
            })
        });
    }
    
    componentDidMount() {
        this.getStageData(this.props.match.params.projectId, this.props.match.params.stageId);
    }

    componentDidUpdate() {
        if(this.props.match.params.stageId !== this.state.stageId) {
            this.getStageData(this.props.match.params.projectId, this.props.match.params.stageId);
        }
    }

    render() {
        return (
            <div className="row justify-content-left content">
                <Sidebar id={this.props.match.params.projectId}/>
                <div className="col">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>
                                Stage {this.state.stageId} : {this.state.name}
                            </h3>
                        </div>
                    </div>
                    <hr/>
                    <UploadFile projectId={this.props.match.params.projectId} stageId={this.props.match.params.stageId} stageVersion={1}/>
                    <File projectId={this.props.match.params.projectId} stageId={this.props.match.params.stageId} stageVersion={1}/>
                </div>
            </div>
        )
    }
}

export default Stage