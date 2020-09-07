import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import '../css/Header.css'

class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             profile: ""
        }
    }
    

    headerButon = (item, index) => {
        if (item.type === "Link") {
            return (
                <Link to={item.link} className="nav-link">
                    {item.title}
                </Link>
            );
        } else if (item.type === "Logout") {
            return (
                <Link to={item.link} className="nav-link" onClick={() => item.onClick(this.props)}>
                    {item.title}
                </Link>
            );
        }
        
    }

    render() {
        return (
            <header className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={this.props.items.title.link} className="navbar-brand col-sm-1 mr-0">
                    {this.props.items.title.name}
                </Link>
                <ul className="navbar-nav px-3 ml-auto list-inline">
                    {this.props.items.buttons.map((item, index) => (
                        <li className="nav-item text-nowrap list-inline-item" key={index}>
                            {this.headerButon(item, index)}
                        </li>
                    ))}
                    {/* {this.props.items.profile ?
                        <li>
                            <Link to={this.props.items.profile.link}>
                                <img className="profile px-1" src={""} alt="Profile"/>
                            </Link>
                        </li>
                        :'' } */}
                </ul>
            </header>
        )
    }
}

export default Header
