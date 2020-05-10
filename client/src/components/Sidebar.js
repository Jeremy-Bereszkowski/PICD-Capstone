import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    render() {
        const sidebarItems = [
            {title: 'Dashboard', link: `/project/${this.props.id}`},
            {title: 'Code Sample', link: '/'},
            {title: 'File Storage', link: '/'},
            {title: 'Edit Project', link: `/projectEdit/${this.props.id}/`},
            {title: 'Delete Project', link: `/projectDelete/${this.props.id}/`}
        ]

        return (
            <div className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        {sidebarItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <div className="nav-link">
                                    <Link to={item.link}>
                                        {item.title}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;
