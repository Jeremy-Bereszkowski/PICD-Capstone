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
        fetch("http://localhost:9000/project/"+projectID)
        .then(res => res.json())
        .then(res => {
            this.setState({
                project_id: res.project[0].project_id,
                title: res.project[0].title,
                date_stamp: res.project[0].date_stamp
            })
        });
    }

    componentWillMount() {
        this.getProjectData(this.props.match.params.id);
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        fetch('http://localhost:9000/project/'+this.state.project_id+'/update', {
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

    renderProject() {
        return (
            <div className="container px-4 py-2">
                <div className="row">
                    <h3>
                        {this.state.title}
                    </h3>
                </div>
                <div className="row">
                    
                        
                    
                </div>
            </div>
        )
    }

    render() {
        return (                
            <div className="row">
                <Sidebar id={this.props.match.params.id}/>
                <div className="col-md-8 p-2">
                    {this.renderProject()}
                </div>
            </div>
        )
    }
}

export default Project