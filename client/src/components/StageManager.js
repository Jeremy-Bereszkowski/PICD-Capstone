import React, { useState, useEffect } from 'react'
import NewStageModal from './NewStageModal'
import { Button, Spinner } from 'react-bootstrap'
import callAPI from '../utils/callAPI'
import auth from '../utils/auth'

function StageManager(props) {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const getStages = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+props.project_id+'/stages')
        .then(res => res.json())
        .then(res => {
            setStages(res)
            setLoading(false)
        });
    }

    const deleteStage = (stage_id) => {
        callAPI.deleteStage((res) => {
            if(res.message) {
                setMessage(res.message);
                console.log(res.message)
            } else {
                setMessage("Deleted Successfully!");
            }
            setMessageType("alert-success");
            getStages();
        }, auth.getUID(), props.project_id, stage_id,
        (error) => {
            if(error.message) {
                setMessage(error.message);
                console.log(error.message)
            } else {
                setMessage("Update Failed!");
            }
            setMessageType("alert-danger");
        })
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
                <NewStageModal project_id={props.project_id} update={getStages}/>
            </div>
        </div>
    )
}

export default StageManager
