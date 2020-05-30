import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AdminNewUser extends Component {
    constructor(props) {
        super(props)
        this.state ={
            err: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        var fname = event.target.fname.value
        var lname = event.target.lname.value
        var clearance = event.target.clearance.value
        var email = event.target.email.value
        var pass = event.target.pass.value
        var confirmpass = event.target.confirmpass.value

        console.log(clearance)

        if (pass !== confirmpass) {
            this.setState({
                ...this.state,
                err: 'Passwords do not match'
            })
        } else {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/admin/users/new', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    clearance: clearance,
                    email: email,
                    password: pass,
                })
            }).then((res) => {
                if(res.status === 200) {
                    window.location.reload();
                    window.location.href = "/admin";
                } else {
                    this.setState({
                        ...this.state,
                        err: 'Error, please try again'
                    })
                }
            }).catch((err) => {
                this.setState({
                    ...this.state,
                    err: 'Error, please try again'
                })
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>
                        New User
                    </h3>
                </div>
                <div className="row">
                    <form className="col" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">First Name: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="fname" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Last Name: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="lname" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Clearance: </label>
                            
                            <div className="col-md-6">
                                <select className="form-control" id="clearance">
                                    <option value="read-only">Read-Only</option>
                                    <option value="edit">Edit</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">E-Mail: </label>
                            
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="email" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Password: </label>
                            
                            <div className="col-md-6">
                                <input type="password" className="form-control" id="pass" required/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Confirm Password: </label>
                            
                            <div className="col-md-6">
                                <input type="password" className="form-control" id="confirmpass" required/>
                            </div>
                        </div>

                        

                        {this.state.err !== "" &&
                            <div className="form-group row">
                                <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>

                                <div className="col-md-6">
                                    <span className="alert-danger form-control">
                                    {this.state.err}
                                    </span>
                                </div>
                            </div>
                        }

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <Link to={`/admin`}>
                                    <button className="btn btn-danger">Cancel</button>
                                </Link>
                                <button type="submit" className="btn btn-success">
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AdminNewUser
