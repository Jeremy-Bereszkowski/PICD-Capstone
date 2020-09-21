import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import callAPI from '../utils/callAPI';

export default function TransferOwnershipModal({projectId, oldOwnerId, newOwnerId}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = (event) => {
        event.preventDefault();

        callAPI.transferProjectOwnership(res => {
            console.log(res)

            if (res.isSuccess === true) {
                window.location.href = "/dashboard/";
            }
        }, projectId, newOwnerId, oldOwnerId);

        handleClose(event);
    }

    return (
        <div className="d-inline-block">
            <Button variant="info" size="sm" onClick={handleShow}>
                Transfer
            </Button>

            <Modal show={show} onHide={handleClose}>
                <form className="col" method="post" onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transfer Ownership</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <p1>Are you sure you want to transfer ownership?</p1>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="info" type="submit">
                            Transfer
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
