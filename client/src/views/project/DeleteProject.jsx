import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

class DeleteProject extends Component {
    deleteProject(projectID, e) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/dashboard/delete/'+projectID)
        .then((response) => {
            if (response.status === 200) {
                return response.json(); 
            }
        })
        .then((data) => {
            /* console.log(data); */
            window.location.href = "/";
        });
    }

    renderProject() {
        return (
            <div className="container px-4 py-2">
                <div className="row">
                    <h3>
                        Are you sure you want to delete project with id: {this.props.match.params.id}?
                    </h3>
                </div>
                <div className="row">
                    <form className="col" method="post" onSubmit={this.handleSubmit}>
                        <div>
                            <div className="col-md-8 offset-md-4">
                                <Link to={`/project/${this.props.match.params.id}`}>
                                    <button className="btn btn-secondary">Cancel</button>
                                </Link>
                                <button id='test' type="button" onClick={(e) => this.deleteProject(this.props.match.params.id, e)} className="btn btn-xs btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="row">
                <Sidebar id={this.props.match.params.id}/>
                <div className="col-md-8 p-2">
                    {this.renderProject()}
                </div>
            </div>
        )
    }
}

export default DeleteProject