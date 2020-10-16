import React, { useState, useEffect } from 'react'
import { Modal, Button} from 'react-bootstrap'
import {useAuth0} from "@auth0/auth0-react"
import { NewStage } from '../utils/api/index'

const NewStageModal = ({ projectId, block, update }) => {
    const [show, setShow] = useState(false);
    const [stageName, setStageName] = useState("");
    const [disable, setDisable] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const {user, getAccessTokenSilently } = useAuth0();

    const handleClose = () => {
        setStageName("");
        setMessage("");
        setMessageType("");
        setShow(false);
    }
    const handleShow = () => {
        setStageName("");
        setMessage("");
        setMessageType("");
        setShow(true);
    };

    useEffect(() => {
        if(stageName === "") {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [stageName])

    const createNewStage = (e) => {
        e.preventDefault();
        if(!disable){
            NewStage(projectId, stageName, user.name, getAccessTokenSilently)
            .then(res => console.log(res))
            .then(() => update())
            .then(() => handleClose())
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow} block={block}>
                New Stage
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create New Stage
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="col" onSubmit={createNewStage}>
                        <div className="form-group row">
                            <label htmlFor="stagename" className="col-md-4 col-form-label text-md-right">Stage Name:</label>

                            <div className="col-md-6">
                                <input type="text" name="stagename" className="form-control" id="stagename" onChange={e => setStageName(e.target.value)}/>
                            </div>
                        </div>

                        {message !== "" &&
                        <div className="form-group row">
                            <div className="col-md-6 offset-md-4">
                                <span className={'form-control ' + messageType}>
                                    {message}
                                </span>
                            </div>
                        </div>}

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <span>
                                    <Button variant="success" type="submit" disabled={disable}>
                                        Create New Stage
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewStageModal

