import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
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
            console.log(data);
            window.location.reload(false);
        });
    }

    renderTableData() {
        return Object.keys(this.state.projectList).map((key) => {
            var data = this.state.projectList[key].date_stamp.substring(5, 10).split('-');
            var date = data[1] + '-' + data[0];

            console.log( this.state.projectList[key].date_stamp);

            var time = this.state.projectList[key].date_stamp.substring(11, 16);

            var dateTime = date + ' ' + time;

            var title = this.state.projectList[key].title;

            var projectID = this.state.projectList[key].project_id;

            return (
                <tr key={key}>
                    <td>{dateTime}</td>
                    <td>{title}</td>
                    <td></td>
                    <td>{projectID}</td>
                    <td></td>
                    <td>
                        <p class='conrol-column'>
                            <button id='test' type="button" onClick={(e) => this.deleteProject(projectID, e)} class="btn btn-xs btn-danger">Delete</button>
                            <button type="button" class="btn btn-xs btn-primary">Edit</button>
                            <button type="button" class="btn btn-xs btn-success">View</button>
                        </p>
                    </td>
                </tr>
            )
        })
    }
      
    render() {
        return (
            <div class='container header'>
                <div class="page-header">
                    <h1>Projects</h1>
                </div>
                <div class='container'>
                    <table class="table">
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
