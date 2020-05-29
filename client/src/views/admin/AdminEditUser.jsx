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
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/admin/users"+userID)
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
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/'+this.state.project_id+'/update', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                    revision: this.state.revision
                })
            })
            .catch(error => this.setState({err: error.message}))

        } catch (error) {
            this.setState({err: error.message});
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
                            <h3>Edit User</h3>
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
                                        <select className="form-control" id="clearance" >
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
                                            <Link to={`/project/${this.props.match.params.id}`}>
                                                <button className="btn btn-danger">Cancel</button>
                                            </Link>
                                        </span>
                                        <span className="px-1">
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