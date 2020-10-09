import React, { useState, useEffect } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'

import callAPI from '../../utils/callAPI'
import auth from '../../utils/auth'
import useGlobal from '../../utils/project'

import Sidebar from '../../components/Sidebar'
import Description from './Description'
import ProjectSettings from './Settings'
import Stage from './Stage'


const Project = (props) => {
    let match = useRouteMatch();
    let { projectId } = useParams();
    
    const [gProject, gProjectAction] = useGlobal();

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("")

    const staticItems = [
        {title: 'Overview', key: 'overview', link: `/project/${projectId}`},
        {title: 'Project Settings', key: 'project-settings', link: `/project/${projectId}/settings`},
    ]

    const getProjectData = () => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/" + projectId)
            .then(res => res.json())
            .then(res => {
                gProjectAction.setTitle(res.project.title)
                gProjectAction.setDescription(res.project.description)
                gProjectAction.setCreatedAt(res.project.created_at)
                gProjectAction.setUpdatedAt(res.project.updated_at)
                gProjectAction.setOwner(res.project.owner)
                resolve(res.project)
            })
            .catch(err => {
                setErr(err)
                reject(err)
            })
        })
    }

    const getStages = () => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectId+'/stages')
            .then(res => res.json())
            .then(res => {
                gProjectAction.setStages(res)
                setLoading(false)
                resolve(res)
            }).catch(err => {
                setErr(err)
                reject(err)
            });
        })
    }

    const updateProjectData = () => {
        callAPI.updateProject((data) => {
            console.log("updated")
        }, projectId, gProject.title, gProject.description,
        (error) => {
            console.log("Error")
        })
    }

    useEffect(() => {
        const getProjectUserList = (owner) => {
            if (owner !== "" && owner === auth.getUID()) {
                callAPI.getProjectUserList((data) => {
                    gProjectAction.setUsers(data.projectUsers);
                    setIsLoading(false)
                }, projectId)
            } else {
                gProjectAction.setUsers([])
            }
        }

        Promise.all([getStages(), getProjectData()])
        .then(responses => {
            // var stages = responses[0];
            var project = responses[1];
            getProjectUserList(project.owner);
        })
        
    }, [projectId]);

    return (
        <div>
            <div className="row justify-content-left content">
                <Sidebar id={projectId} stages={gProject.stages} staticItems={staticItems} loading={loading}/>
                <Switch>
                    <Route exact path={`${match.path}/`}>
                        <Description {...props}/>
                    </Route>
                    <Route path={`${match.path}/settings`}>
                        <ProjectSettings
                            updateProjectDetails={() => updateProjectData}
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