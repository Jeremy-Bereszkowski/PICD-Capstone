import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'
import callAPI from '../../utils/callAPI'
import '../../css/dashboard.css'

class AdminUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true
        }
    }
    
    componentDidMount() {
        this.callAPI();
    }
    
    callAPI() {
        callAPI.getUserList((users) => {
            this.setState({
                users: users,
                isLoading: false
            })
        })

        /* fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/admin/users/')
        .then((response) => { return response.json(); })
        .then((data) => {
            this.setState({
                users: data,
                isLoading: false
            })
        }); */
    }
    
    onClickHandler = (id) => {
        this.props.history.push("/admin/users/"+id)
    }
      
    render() {

        return (
            <div className='col'>
                <div className="row justify-content-left">
                    <AdminSidebar />
                    <div className="col">
                        <div className="row justify-content-center">
                            <span className="col text-left">
                                <h1 className='left'>Users</h1>
                            </span>
                            <span className="col text-right">
                                <Link to={`/admin/users/new`}>
                                    <button className="btn btn-success">New User</button>
                                </Link>
                            </span>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>USER ID</th>
                                    <th>FIRST NAME</th>
                                    <th>LAST NAME</th>
                                    <th>CLEARANCE</th>
                                    <th>E-MAIL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                                this.state.users.map((user) => {
                                    return (
                                        <tr key={user.user_id} className="pointer" onClick={() => this.onClickHandler(user.user_id)}>
                                            <td>{user.user_id}</td>
                                            <td>{user.fname}</td>
                                            <td>{user.lname}</td>
                                            <td>{user.clearance}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default AdminUser;
