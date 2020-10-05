import React, { useState, useEffect } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'
import callAPI from '../../utils/callAPI'
import auth from '../../utils/auth'

import Sidebar from '../../components/Sidebar'
import Description from './Description'
import ProjectSettings from './Settings'
import Stage from './Stage'


const Project = (props) => {
    let match = useRouteMatch();
    let { projectId } = useParams();
    const [title, setTitle] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [updated_at, setUpdated_at] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState("");
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("")

    const staticItems = [
        {title: 'Overview', key: 'overview', link: `/project/${projectId}`},
        {title: 'Project Settings', key: 'project-settings', link: `/project/${projectId}/settings`},
    ]

    const getStages = async() => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectId+'/stages')
        .then(res => res.json())
        .then(res => {
            setStages(res)
            setLoading(false)
        });
    }
    

    const getProjectData = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/" + projectId)
        .then(res => res.json())
        .then(res => {
            setTitle(res.project.title)
            setDescription(res.project.description)
            setCreated_at(res.project.created_at)
            setUpdated_at(res.project.updated_at)
            setOwner(res.project.owner)
        })
        .catch(err => {
            setErr(err)
        })
    }

    const updateProjectData = () => {
        callAPI.updateProject((data) => {
            console.log("updated")
        }, projectId, title, description,
        (error) => {
            console.log("Error")
        })
    }

    const getProjectUserList = (owner) => {
        if (owner !== "" && owner === auth.getUID()) {
            callAPI.getProjectUserList((data) => {
                setUserList(data.projectUsers);
                setIsLoading(false)
            }, projectId)
        } else {
            setUserList([])
        }
    }

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

    const removeUser = (event, uid) => {
        event.preventDefault()
        if (owner === uid) {
            //SET ERROR OR ALERT
        } else {
            callAPI.removeProjectUser((data) => {
                getProjectData();
            }, projectId, uid)
        }
    }

    const datetime = (datetime) => {
        if(datetime !== ""){
            var date = datetime.substring(0, 10).split('-');
            var time = datetime.substring(11, 16);
            return date[2] + "/" + date[1] + "/" + date[0] + ", " + time
        }else {
            return "loading..."
        }
    }

    useEffect(() => {
        getStages();
        getProjectData();
    }, [projectId]);

    useEffect(() => {
        if (owner !== "") {
            getProjectUserList(owner);
        }
    }, [owner])

    return (
        <div>
            <div className="row justify-content-left content">
                <Sidebar id={projectId} stages={stages} staticItems={staticItems} loading={loading}/>
                <Switch>
                    <Route exact path={`${match.path}/`}>
                        <Description title={title} description={description} updated_at={datetime(updated_at)} created_at={datetime(created_at)} {...props}/>
                    </Route>
                    <Route path={`${match.path}/settings`}>
                        <ProjectSettings
                            title={title}
                            setTitle={() => setTitle}
                            description={description}
                            setDescription={() => setDescription}
                            stages={stages}
                            refeshProjectDetails={() => getProjectData}
                            updateProjectDetails={() => updateProjectData}
                            owner={owner}
                            userList={userList}
                            created_at={datetime(created_at)}
                            updated_at={datetime(updated_at)}
                            removeUser={() => removeUser}
                            deleteProject={() => deleteProject}
                            isLoading={isLoading}
                            err={err}
                            {...props}/>
                    </Route>
                    <Route path={`${match.path}/stage/:stageId`}>
                        <Stage {...props}/>
                    </Route>
                </Switch>
                
            </div>
        </div>
    )
}

export default Project