import React, { Component } from 'react';

class Sidebar extends Component {
    render() {

        return (
            <div className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        {this.props.items.map((item, index) => (
                            <li className="nav-item" id={index}>
                                <a href={item.link} className="nav-link">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                        {console.log(this.props.items)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;
