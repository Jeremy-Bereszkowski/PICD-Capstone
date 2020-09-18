import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import callAPI from '../utils/callAPI';

export default function NewProjectCollabModal({projectId}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = (event) => {
        event.preventDefault();

        var uid = event.target.newUid.value;
        var collabId = event.target.clearance.value;

        callAPI.addProjectUser(res => {
            console.log(res)

            if (res.success === true) {
                window.location.href = "/project/"+projectId+"/settings";
            }

        }, projectId, uid, collabId);

        handleClose(event);
    }

    return (
        <div className="d-inline-block">
            <Button variant="success" size="sm" onClick={handleShow}>
                Add User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <form className="col" method="post" onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Project Collaborator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-4 col-form-label text-md-right">User Id: </label>

                            <div className="col-md-4">
                                <input type="text" className="form-control" id="newUid" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Access: </label>

                            <div className="col-md-4">
                                <select className="form-control" id="clearance">
                                    <option value="read">Read</option>
                                    <option value="write">Write</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
