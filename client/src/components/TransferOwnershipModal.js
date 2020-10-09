import React, { useState } from 'react';
import {TransferOwnership} from '../utils/api/index'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useAuth0} from "@auth0/auth0-react";

export default function TransferOwnershipModal({projectId, oldOwnerId, newOwnerId}) {
    const {getAccessTokenSilently} = useAuth0();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = (event) => {
        event.preventDefault();

        TransferOwnership(newOwnerId, oldOwnerId, projectId, getAccessTokenSilently)
        .then((res) => {
            window.location.href = "/dashboard/";
        });

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
