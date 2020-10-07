import React, { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import auth from '../../utils/auth'
import {useAuth0} from "@auth0/auth0-react";

function Settings() {
    const { user } = useAuth0();

    const [uid, setUid] = useState("");

    useEffect(() => {
        callAPI.getUser((user) => {
            setUid(user.user_id);
        }, user.email)
    })

    return (
        <div className='container py-4'>
            <div className="row justify-content-center">
                <span className="col text-left">
                    <h3 className="left">Settings</h3>
                </span>
                <span className="col text-right">
                    
                </span>
            </div>
            <div className="row justify-content-center">
                <span className="col text-left">
                    <h5 className="left">Details</h5>
                </span>
                <span className="col text-right">
                    
                </span>
            </div>
            <div className="row">
                <form className="col">
                    <div className="form-group row">
                        <label htmlFor="fname" className="col-md-3 col-form-label text-md-right">ID:</label>

                        <div className="col-md-6">
                            <p className="form-control" >{uid}</p>
                        </div>
                    </div>
                    <div className="form-group row">

                        <label htmlFor="email" className="col-md-3 col-form-label text-md-right">Email:</label>

                        <div className="col-md-6">
                            <p className="form-control" >{user.name}</p>
                        </div>
                    </div>
                    <div className="form-group row">

                        <label htmlFor="email" className="col-md-3 col-form-label text-md-right">Clearance:</label>

                        <div className="col-md-6">
                            <p className="form-control" >{auth.getClearance(user).toUpperCase()}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings
