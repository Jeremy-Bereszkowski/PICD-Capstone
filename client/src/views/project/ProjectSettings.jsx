import React, { useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import TransferOwnershipModal from '../../components/TransferOwnershipModal'
import NewProjectCollabModal from '../../components/NewProjectCollabModal'
import Sidebar from '../../components/Sidebar'
import callAPI from '../../utils/callAPI'

function ProjectSettings(props) {

    const {user} = useAuth0();

    const [isLoading, setLoading] = useState(true);
    const [project, setProject] = useState({
        project_id: "",
        title: "",
        description: "",
        created_at: "",
        updated_at: "",
        owner: "",
    });
    const [userList, setUserList] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isLoading) {
            getProjectData(props.match.params.projectId);
        }
    })

    const getProjectData = (projectID) => {
        callAPI.getProject(projectID, (res) => {

            setProject({
                project_id: res.project.project_id,
                title: res.project.title,
                email: res.project.email,
                description: res.project.description,
                created_at: res.project.created_at,
                updated_at: res.project.updated_at,
                owner: res.project.owner,
            })

            getProjectUserList(projectID)
        })
    }

    const getProjectUserList = (projectID) => {
        if (project.email === user.name) {
            callAPI.getProjectUserList((data) => {
                setUserList(data.projectUsers)

                console.log(userList)
                console.log(data)

                setLoading(false)
            }, projectID)
        }
    }

    const removeUser = (event, uid) => {
        event.preventDefault()

        if (project.owner !== uid) {
            callAPI.removeProjectUser((data) => {
                window.location.href = "/project/"+project.project_id+"/settings";
            }, project.project_id, uid)
        }
    }

    const updateProject = (event) => {
        event.preventDefault()

        var title = event.target.title.value
        var description = event.target.description.value

        callAPI.updateProject(project.project_id, title, description, (res) => {
            window.location.href = "/project/" + project.project_id + "/settings"
        })
    }

    const deleteProject = (projectID, e) => {
        callAPI.deleteProject(projectID, (res) => {
            window.location.href = "/dashboard";
        })
    }

    const datetime = (datetime) => {
        var date = datetime.substring(0, 10).split('-');
        var time = datetime.substring(11, 16);
        return date[2] + "/" + date[1] + "/" + date[0] + ", " + time
    }

    const projectCollaborators = () => {

        return project.email === user.name ? (
            <div>
                <div className="row">
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                    <div className="col-md-4">
                        <h5>
                            User List
                        </h5>
                    </div>
                    <div className="col-md-4">
                        <NewProjectCollabModal projectId={project.project_id}/>
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
                                        userList.map((usr) => {
                                            return (
                                                <tr key={usr.user_id} className="pointer" >
                                                    <td>{usr.email}</td>
                                                    <td>{usr.privilege.toUpperCase()}</td>
                                                    {
                                                        project.email == usr.email ? null :
                                                            <td>
                                                                <TransferOwnershipModal projectId={project.project_id} oldOwnerId={project.owner} newOwnerId={usr.user_id}/>

                                                                <button className="btn btn-warning btn-sm" onClick={(event) => removeUser(event, usr.user_id)}>
                                                                {/*<button className="btn btn-warning btn-sm" >*/}
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
        <div className="row justify-content-left">
            <Sidebar id={props.match.params.projectId} />
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
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                    <div className="col-md-6">
                        <h5>
                            Edit
                        </h5>
                    </div>
                </div>
                <form onSubmit={updateProject}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group row">
                                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>

                                <div className="col-md-6">
                                    <input type="text" name="title" className="form-control" id="title" placeholder={project.title}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-md-2 col-form-label text-md-right">Project Description: </label>

                                <div className="col-md-6">
                                    <textarea name="description" className="form-control" id="description"  placeholder={project.description}/>
                                </div>
                            </div>
                            {error !== "" ?
                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <span className="alert-danger form-control">
                                            {error}
                                        </span>
                                    </div>
                                </div> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-2">
                                <span>
                                    <button className="btn btn-danger" onClick={() => window.location.href = "/project/" + project.project_id + "/settings"}>
                                        Cancel
                                    </button>
                                </span>
                                    <span className="px-1">
                                    <button className="btn btn-primary" type="submit">
                                        Update
                                    </button>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <hr />
                <div className="row">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="created_at" className="col-md-2 text-md-right">Created At:</label>
                            <span className="col-md-6">{datetime(project.created_at)}</span>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="updated_at" className="col-md-2 text-md-right">Updated At:</label>
                            <span className="col-md-6">{datetime(project.updated_at)}</span>
                        </div>
                    </div>
                </div>
                <hr />
                {projectCollaborators()}
                <div className="row">
                    <form className="col" onSubmit={removeUser}>
                        {error !== "" ?
                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                        <span className="alert-danger form-control">
                                            {error}
                                        </span>
                                </div>
                            </div> : null}
                        <div className="form-group row">
                            <label htmlFor="revision" className="col-md-2 col-form-label text-md-right">Delete Project:</label>

                            <div className="col-md-6">
                                <button id='test' type="button"  className="btn btn-xs btn-danger" onClick={(e) => deleteProject(props.match.params.projectId, e)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProjectSettings;
