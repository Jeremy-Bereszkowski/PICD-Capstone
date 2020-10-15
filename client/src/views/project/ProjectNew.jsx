import React from 'react'
import { Link } from 'react-router-dom'
import {useAuth0} from "@auth0/auth0-react";
import {NewProject} from '../../utils/api/index'

function ProjectNew(props) {
    const {user, getAccessTokenSilently} = useAuth0();

    const createProject = (event) => {
        event.preventDefault()

        const title = event.target.title.value
        const description = event.target.description.value

        NewProject(user.name, title, description, getAccessTokenSilently)
        .then(() => {
            window.location.href = "/dashboard";
        })
    }

    return (
        <div className="container">
            <div className="row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                <div className="col-md-6">
                    <h3>
                        New Project
                    </h3>
                </div>
            </div>
            <div className="row">
                <form className="col" method="post" onSubmit={createProject}>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>

                        <div className="col-md-6">
                            <input type="text" className="form-control" id="title" required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Description: </label>

                        <div className="col-md-6">
                            <textarea type="text" className="form-control" id="description" />
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-2">
                                <span>
                                    <Link to={`/`}>
                                        <button className="btn btn-danger">Cancel</button>
                                    </Link>
                                </span>
                            <span className="px-1">
                                    <button type="submit" className="btn btn-success">
                                        Create
                                    </button>
                                </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectNew
