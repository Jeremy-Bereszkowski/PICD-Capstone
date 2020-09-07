import React from 'react'
import Modal from 'react-bootstrap/Modal'



const FileHistoryModal = ({ files, show, hide, handleDownload }) => {
    return (
        <div>
            <Modal show={show} onHide={hide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        File Version History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-hover">
                        <tbody>
                            {
                                files.map(file => {
                                    const timestamp = new Date(file.updated_at);
                                    var formattedTimestamp = new Intl.DateTimeFormat('en-AU', {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        second: "2-digit"
                                    }).format(timestamp);
                                    return (
                                        <tr key={file.file_id}>
                                            <td>{file.original_filename}</td>
                                            <td className="text-right">{formattedTimestamp}</td>
                                            <td className="text-right"><input type="button" value="Download" className="btn btn-primary" onClick={() => handleDownload(file.file_id, file.original_filename)}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </div>
    )
}

//const forwardFileHistoryModal = React.forwardRef(FileHistoryModal);

export default FileHistoryModal;


