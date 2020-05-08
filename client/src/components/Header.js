import React, { Component } from 'react'

class Header extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0">
                <a href="/" className="navbar-brand col-sm-3 col md 2 mr-0">{process.env.REACT_APP_NAME}</a>
                <ul className="navbar-nav px-3">
                    {this.props.items.map((item, index) => (
                        <li className="nav-item text-nowrap" key={index}>
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
