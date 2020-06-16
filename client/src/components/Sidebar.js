import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             stages: []
        }
    }
    

    getProjectData(projectID) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+projectID+'/stages')
        .then(res => res.json())
        .then(res => {
            this.setState({
                stages: res
            });
            console.log(this.state.stages)
        });
    }

    componentDidMount() {
        this.getProjectData(this.props.id);
    }

    render() {
        const staticItems = [
            {title: 'Overview', link: `/project/${this.props.id}`},
            {title: 'Settings', link: `/project/${this.props.id}/settings`},
        ]

        return (
            <div className="col-md-2 d-sm-block bg-light text-nowrap">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to={staticItems[0].link}>
                                    {staticItems[0].title}
                                </Link>
                            </div>
                        </li>
                        {this.state.stages.map((item, index) => (
                            <li className="nav-item" key={item.stage_id}>
                                <div className="nav-link">
                                    <Link to={`/project/${this.props.id}/stage/${item.stage_id}`} key={item.stage_id}>
                                        {item.name}
                                    </Link>
                                </div>
                            </li>
                        ))}
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to={staticItems[1].link}>
                                    {staticItems[1].title}
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;