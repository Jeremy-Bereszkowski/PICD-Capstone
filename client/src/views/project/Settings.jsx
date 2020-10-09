import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import * as DateTime from '../../utils/dateTime'
import useGlobal from '../../utils/project'

import StageManager from '../../components/StageManager'
import CollaboratorManager from '../../components/CollaboratorManager'

function ProjectSettings({
    updateProjectDetails,
    isLoading,
    err,
    ...props
}) {
    let { projectId } = useParams();
    const [gProject, gProjectAction] = useGlobal();
    const [title, setTitle] = useState(gProject.title);
    const [description, setDescription] = useState(gProject.description);

    useEffect(() => {
        setTitle(gProject.title)
        setDescription(gProject.description)
    }, [gProject.title, gProject.description])

    const deleteProject = (projectID) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + '/dashboard/delete/' + projectID)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            window.location.href = "/";
        });
    }

    return (
        <div className="col">
            <div className="row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                <div className="col-md-6">
                    <h3>
                        Project Settings
                    </h3>
                </div>
            </div>
            <hr />
            <div className="row">
                <form className="col">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>

                        <div className="col-md-6">
                            <input type="text" name="title" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-md-2 col-form-label text-md-right">Project Description: </label>

                        <div className="col-md-6">
                            <textarea name="description" className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                    </div>
                    {err !== "" ?
                        <div className="form-group row">
                            <div className="col-md-6 offset-md-4">
                                <span className="alert-danger form-control">
                                    {err}
                                </span>
                            </div>
                        </div> : null}
                </form>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-2">
                            <span>
                                <button className="btn btn-danger" onClick={() => {/** Insert functions here */}}>
                                    Cancel
                                </button>
                            </span>
                            <span className="px-1">
                                <button className="btn btn-primary" onClick={() => {
                                    gProjectAction.setTitle(title);
                                    gProjectAction.setDescription(description);
                                    updateProjectDetails()
                                    }}>
                                    Update
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col">
                    <div className="form-group row">
                        <label htmlFor="created_at" className="col-md-2 text-md-right">Created At:</label>
                        <span className="col-md-6">{DateTime.format(gProject.created_at)}</span>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="updated_at" className="col-md-2 text-md-right">Updated At:</label>
                        <span className="col-md-6">{DateTime.format(gProject.updated_at)}</span>
                    </div>
                </div>
            </div>
            <hr />
            <StageManager stages={gProject.stages} projectId={projectId} />
            <hr />
            <CollaboratorManager {...props}/>
            <hr />
            <div className="row">
                <form className="col">
                    {err !== "" ?
                        <div className="form-group row">
                            <div className="col-md-6 offset-md-4">
                                <span className="alert-danger form-control">
                                    {err}
                                </span>
                            </div>
                        </div> : null}
                    <div className="form-group row">
                        <label htmlFor="revision" className="col-md-2 col-form-label text-md-right">Delete Project:</label>

                        <div className="col-md-6">
                            <button id='delete-project' type="button" onClick={() => deleteProject(projectId)} className="btn btn-xs btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectSettings
