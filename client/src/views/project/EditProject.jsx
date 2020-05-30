import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

class EditProject extends Component {
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

    render() {
        return (
            <div className="col">
                <div className="row justify-content-left">
                    <Sidebar id={this.props.match.params.id}/>
                    <div className="col">
                        <div className="container-fluid">
                            <h3>{this.state.title}</h3>
                            <form onSubmit={this.handleSubmit}>
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
                    </div>
                </div>
            </div>
            
        )
    }
}

export default EditProject