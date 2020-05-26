import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          projects: [],
          isLoading: true
        }

        /* this.deleteProject = this.deleteProject.bind(this); */
    }
    
    callAPI() {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/dashboard/')
        .then((response) => { return response.json(); })
        .then((data) => {
            this.setState({
                projects: data,
                isLoading: false
            })
        });
    }
    
    componentDidMount() {
        this.callAPI();
    }
    
    datetime = (datetime) => {
        var date = datetime.substring(0, 10).split('-');
        var time = datetime.substring(11, 16);
        return date[2] + "/" + date[1] + "/" + date[0] + ", " + time
    }

    onClickHandler = (id) => {
        this.props.history.push("/project/"+id)
    }
      
    render() {

        return (
            <div className='container py-4'>
                <div className="row justify-content-center">
                    <span className="col text-left">
                        <h1 className='left'>Projects</h1>
                    </span>
                    <span className="col text-right">
                        <Link to={`/newProject/`}>
                            <button className="btn btn-success">New Project</button>
                        </Link>
                    </span>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>CREATED</th>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>ID</th>
                            <th>REVISION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                        this.state.projects.map((project) => {
                            return (
                                <tr key={project.project_id} className="pointer" onClick={() => this.onClickHandler(project.project_id)}>
                                    <td>{this.datetime(project.date_stamp)}</td>
                                    <td>{project.title}</td>
                                    <td>{project.description}</td>
                                    <td>{project.project_id}</td>
                                    <td>{project.revision}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Dashboard;
