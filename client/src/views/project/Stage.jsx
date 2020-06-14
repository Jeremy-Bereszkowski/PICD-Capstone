import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'

class Stage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            err: ""
        }
    }

    getStageData(projectId, stageId) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectId+'/stage/'+stageId)
        .then(res => res.json())
        .then(res => {
            this.setState({
                name: res.name
            })
        });
    }
    
    componentDidMount() {
        this.getStageData(this.props.match.params.projectId, this.props.match.params.stageId);
    }

    render() {
        return (
            <div className="col">
                <div className="row justify-content-left">
                    <Sidebar id={this.props.match.params.projectId}/>
                    <div className="col">
                        <div className="row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                            <div className="col-md-6">
                                <h3>
                                    Stage {this.props.match.params.stageId} : {this.state.name}
                                </h3>
                            </div>
                        </div>
                        <hr/>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Stage