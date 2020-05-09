import React, { Component } from 'react'

class Project extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            project_id: "",
            title: "",
            date_stamp: "",
            description: "",
            revision: ""
        }
    }

    getProjectData(projectID) {
        fetch("http://localhost:9000/project/"+projectID)
        .then(res => res.json())
        .then(res => {
            this.setState({
                project_id: res.project[0].project_id,
                title: res.project[0].title,
                date_stamp: res.project[0].date_stamp,
                description: res.project[0].description,
                revision: res.project[0].revision
            })
        });
    }

    componentWillMount() {
        this.getProjectData(this.props.match.params.id);
    }

    handleSubmit = (event) => {
        var title = event.target.title.value !== '' ? event.target.title.value : this.state.title
        var description = event.target.description.value !== '' ? event.target.description.value : this.state.description
        var revision = event.target.revision.value !== '' ? event.target.revision.value : this.state.revision

        fetch('http://localhost:9000/project/'+this.state.project_id+'/update', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                revision: revision
            })
        }).then((res) => {
            window.location.href = "/";
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
                    <form className="col" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="title" placeholder={this.state.title} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Description: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="description" placeholder={this.state.description} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Revision: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="revision" placeholder={this.state.revision} />
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-8 p-2">
                    {this.renderProject()}
                </div>
            </div>
        )
    }
}

export default Project
