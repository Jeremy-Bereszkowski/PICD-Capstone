import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NewStageModal from './NewStageModal'
import { Button, Spinner } from 'react-bootstrap'
import callAPI from '../utils/callAPI'
import auth from '../utils/auth'

function StageManager({stages, getStages, deleteStage, loading}) {
    let { projectId } = useParams();
    // const [stages, setStages] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [message, setMessage] = useState("");
    // const [messageType, setMessageType] = useState("");

    // const getStages = () => {
    //     fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+props.project_id+'/stages')
    //     .then(res => res.json())
    //     .then(res => {
    //         setStages(res)
    //         setLoading(false)
    //     });
    // }



    // useEffect(() => {
    //     getStages();
    // }, []);

    return (
        <div className="row">
            <div className="col-md-6 offset-md-2">
                <h5>Stage Manager</h5>
                {!loading?
                <>
                    <table className="table table-hover">
                        <tbody>
                            {stages.map((stage) => (
                                <tr key={stage.stage_id}>
                                    <td>{stage.name}</td>
                                    <td className="text-right">
                                        <Button variant="danger" onClick={() => deleteStage(stage.stage_id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                    <NewStageModal className="row" project_id={projectId} update={getStages}/>
                </>
                :
                <>
                <div className="row justify-content-center">
                    <Spinner animation="border" variant="primary" role="status" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                </>}
                
                
            </div>
        </div>
    )
}

export default StageManager
