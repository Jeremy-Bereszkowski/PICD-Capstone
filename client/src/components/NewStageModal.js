import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const NewStageModal = ({ project_id, block }) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow} block={block}>
                New Stage
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create New Stage
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    new stage
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewStageModal
