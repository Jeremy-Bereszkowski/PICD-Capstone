import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 }  from "@auth0/auth0-react";
import callAPI from "../utils/callAPI";
import '../css/dashboard.css';

function Dashboard(props) {

    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    const { user } = useAuth0();

    useEffect(() => {
        if (isLoading) {
            callAPI.loadDashboard((projectList) => {
                setProjects(projectList)
                setLoading(false);
            }, user.name)
        }
    })

    const onClickHandler = (id) => {
        props.history.push("/project/"+id)
    }

    return (
        <div className='container py-4'>
            <div className="row justify-content-center">
                    <span className="col text-left">
                        <h1 className='left'>Projects</h1>
                    </span>
                <span className="col text-right">
                        <Link to={`/project/new`}>
                            <button className="btn btn-success">New Project</button>
                        </Link>
                    </span>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>TITLE</th>
                    <th>DESCRIPTION</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                    projects.map((project) => {
                        return (
                            <tr key={project.project_id} className="pointer" onClick={() => onClickHandler(project.project_id)}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Dashboard;
