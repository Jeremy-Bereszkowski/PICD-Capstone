import React, { useState, useEffect } from 'react'
import NewStageModal from './NewStageModal'
import { Button, Spinner } from 'react-bootstrap'
import {useAuth0} from "@auth0/auth0-react";
import { DeleteStage, GetStages } from '../utils/api/index'

function StageManager({ projectId }) {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const {user, getAccessTokenSilently } = useAuth0();

    const deleteStage = (stageId) => {
        console.log(projectId, stageId, user)
        DeleteStage(projectId, stageId, user.name, getAccessTokenSilently)
        .then((res) => {
            console.log("Res", res);
            getStages();
            window.location.reload(true);
        })
    }

    const getStages = () => {
        GetStages(projectId, getAccessTokenSilently)
        .then(res => {
            setStages(res)
            setLoading(false)
        })
    }

    const update = () => {
        window.location.reload(true);
    }

    useEffect(() => {
        getStages();
    }, []);

    return (
        <div className="row">
            <div className="col-md-6 offset-md-2">
                <h5>Stage Manager</h5>
                <table className="table table-hover">
                    <tbody>
                        {!loading? stages.map((stage) => {
                            console.log(stage)
                            return (
                                <tr key={stage.stage_id}>
                                    <td>{stage.name}</td>
                                    <td className="text-right">
                                        <Button variant="danger" onClick={() => deleteStage(stage.stage_id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }) : 
                        <tr className="text-center">
                            <Spinner animation="border" variant="primary" role="status" >
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </tr>}
                    </tbody>
                </table>
                <NewStageModal projectId={projectId} update={update}/>
            </div>
        </div>
    )
}

export default StageManager
