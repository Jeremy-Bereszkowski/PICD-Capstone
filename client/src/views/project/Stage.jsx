import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import UploadFile from '../../components/UploadFile'
import File from '../../components/File'
import NewVersionModal from '../../components/NewVersionModal'
import {GetStage, GetStageDetails} from '../../utils/api/index'
import '../../css/stage.css'
import {useAuth0} from "@auth0/auth0-react";

function Stage(props) {
    const { getAccessTokenSilently } = useAuth0();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState();
    const [update, setUpdate] = useState(false);
    
    /**
     * Submit new stage version to the api server.
     * 
     * @param {*} event 
     */
    const submitNewVersion = (event) => {
        event.preventDefault()
        var newRevisionName = event.target.title.value
        
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/version/new/"+props.match.params.projectId+'/'+props.match.params.stageId, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                newRevisionName: newRevisionName
            })
        }).then((res) => {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/version/" + props.match.params.projectId + '/' + props.match.params.stageId)
                .then(res => res.json())
                .then(res => {
                    setVersions(res);
                    setSelectedVersion(res[0].version_id)
            });
        })
    }

    /**
     * Runs when stageId is updated.
     */
    useEffect(() => {
        /**
         * Get an array of all the versions of the current stage.
         */
        GetStage(props.match.params.projectId, props.match.params.stageId, getAccessTokenSilently)
        .then((res) => {
            console.log(res)
            setVersions(res);
            setSelectedVersion(res[0].version_id)
        })

        /**
         * Get the stage details
         */
        GetStageDetails(props.match.params.projectId, props.match.params.stageId, getAccessTokenSilently)
        .then((res) => {
            setName(res.name);
            setDescription(res.description);
        })
    }, [props.match.params.projectId, props.match.params.stageId]);

    const handleUpdate = () => {
        setUpdate(prevUpdate => !prevUpdate);
    }

    return (
        <div className="row justify-content-left content">
            <Sidebar id={props.match.params.projectId} />
            <div className="col">
                <div className="row">
                    <div className="col-md-6">
                        <h3>
                            {name}
                        </h3>
                        <h5>
                            {description}
                        </h5>
                    </div>
                    <div className="col-md-6 text-right">
                        <div className="d-inline-block px-1 py-1">
                            <select className="custom-select" value={selectedVersion}
                                onChange={(e) => {
                                    setSelectedVersion(e.target.value);
                                }}>
                                {versions.map(
                                    (version) => 
                                        <option key={version.version_id} value={version.version_id}>{version.revision}: {version.name}</option>
                                )}
                            </select>
                        </div>
                        <NewVersionModal handleSubmit={submitNewVersion}/>
                    </div>
                </div>
                <hr/>
                {selectedVersion === null ? 
                <div>
                    <p>Loading...</p>
                </div> :
                <div>
                    <UploadFile projectId={props.match.params.projectId} stageId={props.match.params.stageId} stageVersion={selectedVersion} uploadComplete={handleUpdate}/>
                    <File projectId={props.match.params.projectId} stageId={props.match.params.stageId} stageVersion={selectedVersion} update={update}/>
                </div> }   
            </div>
        </div>
    )
}

export default Stage;
