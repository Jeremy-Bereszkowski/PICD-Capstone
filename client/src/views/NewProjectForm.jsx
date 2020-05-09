import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Project extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = (event) => {
        var title = event.target.title.value /* !== '' ? event.target.title.value : this.state.title */
        var description = event.target.description.value /* !== '' ? event.target.description.value : this.state.description */
        var revision = event.target.revision.value /* !== '' ? event.target.revision.value : this.state.revision */

        fetch('http://localhost:9000/project/new', {
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
                        New Project
                    </h3>
                </div>
                <div className="row">
                    <form className="col" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="title" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Description: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="description" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Revision: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="revision" />
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <Link to={`/`}>
                                    <button className="btn btn-danger">Cancel</button>
                                </Link>
                                <button type="submit" className="btn btn-success">
                                    Create
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
