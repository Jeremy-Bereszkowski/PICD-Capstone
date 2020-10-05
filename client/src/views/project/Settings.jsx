import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import auth from '../../utils/auth'

import NewProjectCollabModal from '../../components/NewProjectCollabModal'
import TransferOwnershipModal from '../../components/TransferOwnershipModal'
import StageManager from '../../components/StageManager'

function ProjectSettings({
    title,
    setTitle,
    description,
    setDescription,
    stages,
    refeshProjectDetails,
    updateProjectDetails,
    owner,
    userList,
    created_at,
    updated_at,
    removeUser,
    deleteProject,
    isLoading,
    err
}) {
    let { projectId } = useParams();

    const projectCollaborators = () => {
        return owner === auth.getUID() ? (
            <div>
                <div className="row">
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                    <div className="col-md-4">
                        <h5>
                            User List
                        </h5>
                    </div>
                    <div className="col-md-4">
                        <NewProjectCollabModal projectId={projectId}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-2">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Privilege</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                                            userList.map((user) => {
                                                return (
                                                    <tr key={user.user_id} className="pointer" >
                                                        <td>{user.fname} {user.lname}</td>
                                                        <td>{user.privilege.toUpperCase()}</td>
                                                        {
                                                            owner === user.user_id ? null :
                                                            <td className="text-right">
                                                                <TransferOwnershipModal projectId={projectId} oldOwnerId={owner} newOwnerId={user.user_id}/>

                                                                <button className="btn btn-warning btn-sm" onClick={(event) => removeUser(event, user.user_id)}>
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        ) : null
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
                                <button className="btn btn-danger" onClick={() => refeshProjectDetails(projectId)}>
                                    Cancel
                                </button>
                            </span>
                            <span className="px-1">
                                <button className="btn btn-primary" onClick={updateProjectDetails()}>
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
                        <span className="col-md-6">{created_at}</span>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="updated_at" className="col-md-2 text-md-right">Updated At:</label>
                        <span className="col-md-6">{updated_at}</span>
                    </div>
                </div>
            </div>
            <hr />
            <StageManager stages={stages} projectId={projectId} />
            <hr />
            {projectCollaborators()}
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
