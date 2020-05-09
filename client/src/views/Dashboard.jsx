import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          projectList: ""
        }

        this.deleteProject = this.deleteProject.bind(this);
    }
    
    callAPI() {
        fetch('http://localhost:9000/dashboard/')
        .then((response) => { return response.json(); })
        .then((data) => {
          this.setState({
            projectList: data.projectList
          })
        });
    }
    
    componentWillMount() {
        this.callAPI();
    }

    deleteProject(projectID, e) {
        fetch('http://localhost:9000/dashboard/delete/'+projectID)
        .then((response) => {
            if (response.status === 200) {
                return response.json(); 
            }
        })
        .then((data) => {
            /* console.log(data); */
            window.location.reload(false);
        });
    }

    renderTableData() {
        return Object.keys(this.state.projectList).map((key) => {
            var data = this.state.projectList[key].date_stamp.substring(5, 10).split('-');
            var date = data[1] + '-' + data[0];

            /* console.log( this.state.projectList[key].date_stamp); */

            var time = this.state.projectList[key].date_stamp.substring(11, 16);

            var dateTime = date + ' ' + time;

            var title = this.state.projectList[key].title;

            var projectID = this.state.projectList[key].project_id;

            var description = this.state.projectList[key].description;

            var revision = this.state.projectList[key].revision;

            return (
                
                <tr key={key}>
                    
                    <td>{dateTime}</td>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td>{projectID}</td>
                    <td>{revision}</td>
                    <td>
                        <p className='control-column'>
                            <button id='test' type="button" onClick={(e) => this.deleteProject(projectID, e)} className="btn btn-xs btn-danger">Delete</button>
                            {/* <Link to={`/projectDetails/${projectID}/`}>
                                <button className="btn btn-info">Edit</button>
                            </Link> */}
                            <Link to={`/project/${projectID}/`}>
                                <button className="btn btn-success">View</button>
                            </Link>
                        </p>
                    </td>
                </tr>
            )
        })
    }
      
    render() {
        return (
            <div className='container header'>
                <div className="page-header">
                    <h1>Projects</h1>
                </div>
                <div className='container'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CREATED</th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>ID</th>
                                <th>REVISION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dashboard;
