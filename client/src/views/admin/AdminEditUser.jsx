import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

class AdminEditUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user_id: "",
            fname: "",
            lname: "",
            clearance: "",
            email: "",
            err: ""
        }
    }

    getProjectData(userID) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/admin/users/"+userID)
        .then(res => res.json())
        .then(res => {
            this.setState({
                user_id: res.user.user_id,
                fname: res.user.fname,
                lname: res.user.lname,
                clearance: res.user.clearance,
                email: res.user.email
            })
        });
    }

    componentDidMount() {
        this.getProjectData(this.props.match.params.id);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        try {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/admin/users/'+this.state.user_id+'/update', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    fname: this.state.fname,
                    lname: this.state.lname,
                    clearance: this.state.clearance,
                    email: this.state.email
                })
            })
            .then(res => {
                if(res.status === 200) {
                    window.location.href = "/admin";
                }
            })
            .catch(error => this.setState({err: error.message}))

        } catch (error) {
            this.setState({err: error.message});
        }
    }

    deleteProject = (event) => {
        event.preventDefault()
        console.log()
        try {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/admin/users/delete/'+this.state.user_id)
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = "/admin";
                }
            })
            .catch(error => this.setState({err: error.message}))
        } catch (err) {
            //this.setState({...this.state, err: err.message});
        }
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="col">
                <div className="row justify-content-left">
                    <div className="col">
                        <div className="container-fluid">
                            <h3>Edit User - UID: {this.state.user_id}</h3>
                            <form className="col" method="post" onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">First Name: </label>
                                    
                                    <div className="col-md-6">
                                        <input name="fname" type="text" className="form-control" id="fname" value={this.state.fname} onChange={this.handleFormChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Last Name: </label>
                                    
                                    <div className="col-md-6">
                                        <input name="lname" type="text" className="form-control" id="lname" value={this.state.lname} onChange={this.handleFormChange} required/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Clearance: </label>
                                    
                                    <div className="col-md-6">
                                        <select name="clearance" className="form-control" id="clearance" onChange={this.handleFormChange} /*defaultValue=/* {this.state.clearance}"Admin" */>
                                            <option value="read-only" >Read-Only</option>
                                            <option value="edit" >Edit</option>
                                            <option value="admin" >Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right">E-Mail: </label>
                                    
                                    <div className="col-md-6">
                                        <input name="email" type="text" className="form-control" id="email" value={this.state.email} onChange={this.handleFormChange} required/>
                                    </div>
                                </div>

                                {this.state.err !== "" ?
                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <span className="alert-danger form-control">
                                            {this.state.err}
                                            </span>
                                        </div>
                                    </div> : null
                                }

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-2">
                                        <span>
                                            <Link to={`/admin`}>
                                                <button className="btn btn-danger">Cancel</button>
                                            </Link>
                                        </span>
                                        <span className="px-1">
                                            <button className="btn btn-warning" onClick={this.deleteProject}>
                                                Delete
                                            </button>
                                        </span>
                                        <span>
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminEditUser