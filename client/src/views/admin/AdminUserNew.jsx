import React, { Component } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Link } from 'react-router-dom'
import callAPI from '../../utils/callAPI'

class AdminUserNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

    var clearEnum = 1;

    if (clearance === 'admin')
      clearEnum = 2;

    if (pass !== confirmpass) {
      this.setState({
        ...this.state,
        err: 'Passwords do not match'
      })
    } else {
      callAPI.newUser((() => {
        //window.location.reload();
        //window.location.href = "/admin/users";
      }),
        fname,
        lname,
        clearEnum,
        email,
        pass,
        (() => {
          this.setState({
            ...this.state,
            err: 'Error, please try again'
          })
        }))
    }
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
                  New User
                                </h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <form className="col" method="post" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">First Name: </label>

                  <div className="col-md-6">
                    <input type="text" className="form-control" id="fname" required />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Last Name: </label>

                  <div className="col-md-6">
                    <input type="text" className="form-control" id="lname" required />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Clearance: </label>

                  <div className="col-md-6">
                    <select className="form-control" id="clearance">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">E-Mail: </label>

                  <div className="col-md-6">
                    <input type="text" className="form-control" id="email" required />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Password: </label>

                  <div className="col-md-6">
                    <input type="password" className="form-control" id="pass" required />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Confirm Password: </label>

                  <div className="col-md-6">
                    <input type="password" className="form-control" id="confirmpass" required />
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
                  <div className="col-md-6 offset-md-2">
                    <span>
                      <Link to={`/admin/users`}>
                        <button className="btn btn-danger">Cancel</button>
                      </Link>
                    </span>
                    <span className="px-1">
                      <button type="submit" className="btn btn-success">
                        Create
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

export default AdminUserNew