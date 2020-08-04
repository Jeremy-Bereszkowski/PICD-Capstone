import React, { Component } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Link } from 'react-router-dom'
import callAPI from '../../utils/callAPI'


class AdminUserEdit extends Component {
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
    callAPI.getUser((user) => {
      this.setState({
        user_id: user.user_id,
        fname: user.fname,
        lname: user.lname,
        clearance: user.clearance,
        email: user.email
      })

    }, userID)
  }

  componentDidMount() {
    this.getProjectData(this.props.match.params.id);
  }

  handleSubmit = (event) => {
    event.preventDefault()
    callAPI.updateUser(() => {
      window.location.href = "/admin/users";
    },
      this.state.user_id,
      this.state.fname,
      this.state.lname,
      this.state.clearance,
      this.state.email,
      (error) => {
        this.setState({ err: error.message })
      }
    )
  }

  deleteProject = (event) => {
    event.preventDefault()
    //console.log()
    callAPI.deleteProject(() => {
      window.location.href = "/admin/users";
    },
      this.state.user_id,
      (error) => {
        this.setState({ err: error.message })
      }
    )

    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/admin/users/delete/' + this.state.user_id

    //console.log(url)
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
          <AdminSidebar />
          <div className="col">
            <div className="row">
              <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
              <div className="col-md-6">
                <h3>
                  Edit User - UID: {this.state.user_id}
                </h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <form className="col" method="post" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">First Name: </label>

                  <div className="col-md-6">
                    <input name="fname" type="text" className="form-control" id="fname" value={this.state.fname} onChange={this.handleFormChange} required />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Last Name: </label>

                  <div className="col-md-6">
                    <input name="lname" type="text" className="form-control" id="lname" value={this.state.lname} onChange={this.handleFormChange} required />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Clearance: </label>

                  <div className="col-md-6">
                    <select name="clearance" className="form-control" id="clearance" onChange={this.handleFormChange}>
                      <option value="user" >User</option>
                      <option value="admin" >Admin</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">E-Mail: </label>

                  <div className="col-md-6">
                    <input name="email" type="text" className="form-control" id="email" value={this.state.email} onChange={this.handleFormChange} required />
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
                      <Link to={`/admin/users`}>
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

export default AdminUserEdit
