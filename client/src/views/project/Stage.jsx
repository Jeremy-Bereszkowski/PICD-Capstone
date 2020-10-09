import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UploadFile from '../../components/UploadFile'
import File from '../../components/File'
import NewVersionModal from '../../components/NewVersionModal'
import '../../css/stage.css'

function Stage(props) {
    let { projectId, stageId } = useParams();
    const [name, setName] = useState("");
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
        
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/version/new/"+projectId+'/'+stageId, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                newRevisionName: newRevisionName
            })
        }).then((res) => {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/version/" + projectId + '/' + stageId)
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
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/version/" + projectId + '/' + stageId)
            .then(res => res.json())
            .then(res => {
                setVersions(res);
                setSelectedVersion(res[0].version_id)
            });

        /**
         * Get the stage details
         */
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectId+'/stage/'+stageId)
            .then(res => res.json())
            .then(res => {
                setName(res.name);
            });
    }, [projectId, stageId]);

    const handleUpdate = () => {
        setUpdate(prevUpdate => !prevUpdate);
    }

    return (
        <div className="col">
            <div className="row">
                <div className="col-md-6">
                    <h3>
                        Stage: {name}
                    </h3>
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
                <UploadFile projectId={projectId} stageId={stageId} stageVersion={selectedVersion} uploadComplete={handleUpdate}/>
                <File projectId={projectId} stageId={stageId} stageVersion={selectedVersion} update={update}/>
            </div> }   
        </div>
    )
}

export default Stage;