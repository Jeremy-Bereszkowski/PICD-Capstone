import React, { Component } from 'react'

class Header extends Component {

    render() {
        return (

            <div className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
                <a href="/dashboard" className="navbar-brand col-sm-3 col md 2 mr-0">{this.props.title}</a>
                <ul className="navbar-nav px-3">
                    {this.props.items.map((item, index) => (
                        <li className="nav-item text-nowrap" id={index}>
                            <a href={item.link} className="nav-link" onClick={item.onClick}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Header
