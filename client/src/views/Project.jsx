import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'

class Project extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            project_id: "",
            title: "",
            date_stamp: ""
        }
    }

    getProjectData(projectID) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectID)
        .then(res => res.json())
        .then(res => {
            this.setState({
                project_id: res.project.project_id,
                title: res.project.title,
                date_stamp: res.project.date_stamp
            })
        });
    }

    componentDidMount() {
        this.getProjectData(this.props.match.params.id);
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/'+this.state.project_id+'/update', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title
            })
        }).then((res) => {
            this.componentWillMount()
        })
        event.preventDefault()
    }

    render() {
        return (                
            <div className="col">
                <div className="row justify-content-left">
                    <Sidebar id={this.props.match.params.id}/>
                    <div className="col">
                        <div className="container-fluid">
                            <h3>
                                {this.state.title}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Project