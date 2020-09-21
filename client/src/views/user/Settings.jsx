import React, { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import auth from '../../utils/auth'

function Settings() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");

    const [oldpword, setOldpword] = useState("");
    const [newpword, setNewpword] = useState("");
    const [confirmpword, setConfirmpword] = useState("");
    const [match, setMatch] = useState(false);

    //Message for User Details Update
    const [detailsMessage, setDetailsMessage] = useState("");
    const [detailsMessageType, setDetailsMessageType] = useState("");
    
    //Message for Password Update
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); //alert-danger, alert-warning, alert-success

    useEffect(() => {
        callAPI.getUser((user) => {
            setFname(user.fname);
            setLname(user.lname);
            setEmail(user.email);
        }, auth.getUID())
    }, [])

    useEffect(() => {
        if(newpword !== confirmpword) {
            setMessage("Passwords Don't Match");
            setMessageType("alert-danger");
            setMatch(false);
        } else {
            setMessage("");
            setMessageType("");
            if(newpword !== "") {
                setMatch(true)
            }
            
        }
    }, [newpword, confirmpword])

    const updatePassword = (e) => {
        e.preventDefault();
        callAPI.updateUserPassword(
            (res) => {
                setMessage(res.message)
                setMessageType("alert-success")
            },
            auth.getUID(),
            oldpword,
            newpword,
            (err) => {
                setMessage(err.message)
                setMessageType("alert-danger")
        })
    }

    const updateUserDetails = (e) => {
        e.preventDefault();
        callAPI.updateUser(() => {
            setDetailsMessage("Updated Successfully!");
            setDetailsMessageType("alert-success");
        }, auth.getUID(), fname, lname, auth.getClearance(), email, () => {
            setDetailsMessage("Update Failed!");
            setDetailsMessageType("alsert-danger");
        })
    }

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
                <form className="col" onSubmit={updateUserDetails}>
                    <div className="form-group row">
                        <label htmlFor="fname" className="col-md-3 col-form-label text-md-right">First Name:</label>

                        <div className="col-md-6">
                            <input type="text" name="fname" className="form-control" id="fname" value={fname} onChange={e => setFname(e.target.value)} disabled={auth.getClearance().toLowerCase() !== 'admin'? true : false}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lname" className="col-md-3 col-form-label text-md-right">Last Name:</label>

                        <div className="col-md-6">
                            <input type="text" name="lname" className="form-control" id="lname" value={lname} onChange={e => setLname(e.target.value)} disabled={auth.getClearance().toLowerCase() !== 'admin'? true : false}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-md-3 col-form-label text-md-right">Email:</label>

                        <div className="col-md-6">
                            <input type="text" name="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} disabled={auth.getClearance().toLowerCase() !== 'admin'? true : false}/>
                        </div>
                    </div>

                    {detailsMessage !== "" &&
                    <div className="form-group row">
                        <div className="col-md-6 offset-md-3">
                            <span className={'form-control ' + detailsMessageType}>
                                {detailsMessage}
                            </span>
                        </div>
                    </div>}

                    {auth.getClearance().toLowerCase() === 'admin'? 
                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-3">
                            <span>
                                <button className="btn btn-primary" type="submit">
                                    Update Details
                                </button>
                            </span>
                        </div>
                    </div>
                    : null}
                </form>
            </div>
            
            <div className="row justify-content-center">
                <span className="col text-left">
                    <h5 className="left">Reset Password</h5>
                </span>
                <span className="col text-right">
                    
                </span>
            </div>
            <div className="row">
                <form onSubmit={updatePassword} className="col">
                    <div className="form-group row">
                        <label htmlFor="fname" className="col-md-3 col-form-label text-md-right">Old Password:</label>

                        <div className="col-md-6">
                            <input type="password" name="fname" className="form-control" id="fname" onChange={e => setOldpword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="fname" className="col-md-3 col-form-label text-md-right">New Password:</label>

                        <div className="col-md-6">
                            <input type="password" name="fname" className="form-control" id="fname" onChange={e => setNewpword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lname" className="col-md-3 col-form-label text-md-right">Confirm New Password:</label>

                        <div className="col-md-6">
                            <input type="password" name="lname" className="form-control" id="lname" onChange={e => setConfirmpword(e.target.value)}/>
                        </div>
                    </div>
                    {message !== "" &&
                    <div className="form-group row">
                        <div className="col-md-6 offset-md-3">
                            <span className={'form-control ' + messageType}>
                                {message}
                            </span>
                        </div>
                    </div>}
                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-3">
                            <span>
                                <button className="btn btn-primary" type="submit" disabled={!match}>
                                    Update Password
                                </button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings
