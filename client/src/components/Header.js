import React, { Component } from 'react'

class Header extends Component {

    render() {
        return (
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a href="#" className="navbar-brand col-sm-3 col md 2 mr-0">PICD</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" onClick={this.props.logoutHandler}>
                            Log Out
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header
