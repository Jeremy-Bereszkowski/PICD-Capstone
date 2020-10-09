import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NewProjectCollabModal from './NewProjectCollabModal'
import TransferOwnershipModal from './TransferOwnershipModal'
import callAPI from '../utils/callAPI'

import useGlobal from '../utils/project'

function CollaboratorManager(props) {
    let { projectId } = useParams();
    const gProject = useGlobal()[0];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [gProject.users])

    const removeUser = (event, uid) => {
        event.preventDefault()
        if (gProject.owner === uid) {
            //SET ERROR OR ALERT
        } else {
            callAPI.removeProjectUser((data) => {
                window.location.href = "/project/"+projectId+"/settings";
            }, projectId, uid)
        }
    }

    return (
        <div>
            <div className="row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                <div className="col-md-4">
                    <h5>
                        User List
                    </h5>
                </div>
                <div className="col-md-4">
                    <NewProjectCollabModal projectId={projectId}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-2">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Privilege</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                                        gProject.users.map((user) => {
                                            return (
                                                <tr key={user.user_id} className="pointer" >
                                                    <td>{user.fname} {user.lname}</td>
                                                    <td>{user.privilege.toUpperCase()}</td>
                                                    {
                                                        gProject.owner === user.user_id ? null :
                                                        <td>
                                                            <TransferOwnershipModal projectId={projectId} oldOwnerId={gProject.owner} newOwnerId={user.user_id}/>

                                                            <button className="btn btn-warning btn-sm" onClick={(event) => removeUser(event, user.user_id)}>
                                                                Remove
                                                            </button>
                                                        </td>
                                                    }
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollaboratorManager
