import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

class ProjectSettings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            project_id: "",
            title: "",
            date_stamp: "",
            description: "",
            revision: "",
            err: ""
        }
    }

    getProjectData(projectID) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectID)
        .then(res => res.json())
        .then(res => {
            this.setState({
                project_id: res.project.project_id,
                title: res.project.title,
                date_stamp: res.project.date_stamp,
                description: res.project.description,
                revision: res.project.revision
            })
        });
    }

    componentDidMount() {
        this.getProjectData(this.props.match.params.id);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        try {
            if(this.state.title.length < 1){
                throw new Error('Title can not be empty');
            }

            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/'+this.state.project_id+'/update', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                    revision: this.state.revision
                })
            })
            .catch(error => this.setState({err: error.message}))

        } catch (error) {
            this.setState({err: error.message});
        }
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    deleteProject(projectID, e) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/dashboard/delete/'+projectID)
        .then((response) => {
            if (response.status === 200) {
                return response.json(); 
            }
        })
        .then((data) => {
            /* console.log(data); */
            window.location.href = "/";
        });
    }

    render() {
        return (
            <div className="col">
                <div className="row justify-content-left">
                    <Sidebar id={this.props.match.params.id}/>
                    <div className="col">
                        <div className="row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                            <div className="col-md-6">
                                <h3>
                                    Project Settings
                                </h3>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                            <div className="col-md-6">
                                <h5>
                                    Edit
                                </h5>
                            </div>
                        </div>
                        <div className="row">
                            <form className="col" onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>
                                    
                                    <div className="col-md-6">
                                        <input type="text" name="title" className="form-control" id="title" value={this.state.title} onChange={this.handleFormChange}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="description" className="col-md-2 col-form-label text-md-right">Project Description: </label>
                                    
                                    <div className="col-md-6">
                                        <textarea name="description" className="form-control" id="description" value={this.state.description} onChange={this.handleFormChange}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="revision" className="col-md-2 col-form-label text-md-right">Project Revision: </label>
                                    
                                    <div className="col-md-6">
                                        <input name="revision" type="text" className="form-control" id="revision" value={this.state.revision} disabled/>
                                    </div>
                                </div>
                                {this.state.err !== "" ?
                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <span className="alert-danger form-control">
                                        {this.state.err}
                                        </span>
                                    </div>
                                </div>: null}
                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-2">
                                        <span>
                                            <Link to={`/project/${this.props.match.params.id}`}>
                                                <button className="btn btn-danger">Cancel</button>
                                            </Link>
                                        </span>
                                        <span className="px-1">
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr/>
                        <div className="row">
                            <form className="col" onSubmit={this.handleSubmit}>
                                {this.state.err !== "" ?
                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <span className="alert-danger form-control">
                                        {this.state.err}
                                        </span>
                                    </div>
                                </div>: null}
                                <div className="form-group row">
                                    <label htmlFor="revision" className="col-md-2 col-form-label text-md-right">Delete Project?</label>
                                    
                                    <div className="col-md-6">
                                        <button id='test' type="button" onClick={(e) => this.deleteProject(this.props.match.params.id, e)} className="btn btn-xs btn-warning">
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectSettings