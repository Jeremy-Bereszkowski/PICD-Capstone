import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function NewVersionModal({handleSubmit}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = (event) => {
        handleSubmit(event);
        handleClose(event);
    }

    return (
        <div className="d-inline-block">
            <Button variant="success" size="sm" onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <form className="col" method="post" onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Version</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-4 col-form-label text-md-right">Version Title: </label>

                            <div className="col-md-4">
                                <input type="text" className="form-control" id="title" required />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
