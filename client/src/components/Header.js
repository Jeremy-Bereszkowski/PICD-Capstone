import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";
import auth from '../utils/auth'

function Header() {
    const { isAuthenticated, user } = useAuth0();

    const HeaderItems = {
        buttons: [
            {title: 'Dashboard', type: "Link", clearance: "all", link: "/dashboard"},
            {title: 'User', type: "menu", clearance: "all", menu: [
                    {title: 'User', type: "header", clearance: "all"},
                    {title: 'Settings', type: "Link", clearance: "all", link: "/user/settings"},
                    /*{title: 'Administator', type: "header", clearance: "admin"},
                    {title: 'Settings', type: "Link", clearance: "admin", link: "/admin/users"},*/
                    {type: "divider", clearance: "all"},
                    {title: 'Logout', type: "Logout", clearance: "all", link: "/", onClick: () => {auth.logout()}},
                ],
                icon: "user-icon"}
        ],
        title: {
            name: process.env.REACT_APP_NAME,
            link: "/dashboard"
        }
    };

    const headerButtons = (item, index) => {
        if(item.clearance.toLowerCase() === "all" || item.clearance.toLowerCase() === auth.getClearance().toLowerCase()) {
            if(item.type.toLowerCase() === "link") {
                    return (
                        <Nav.Link href={item.link} key={item.title + index}>{item.title}</Nav.Link>
                    )
            }
            
            if(item.type.toLowerCase() === "logout") {
                return (
                    <Nav.Link onclick={item.onclick} key={item.title + index}>{item.title}</Nav.Link>
                )
            }

            if(item.type === "menu") {
                return (
                    <NavDropdown title={item.title} id="basic-nav-dropdown" drop="down" alignRight key={item.title + index}>
                        {item.menu.map((i, index) => {
                            if(i.clearance.toLowerCase() === "all" || i.clearance.toLowerCase() === auth.getClearance(user).toLowerCase()) {
                                if(i.type.toLowerCase() === "link") {
                                    return (
                                        <NavDropdown.Item href={i.link} key={i.title + index}>
                                            {i.title}
                                        </NavDropdown.Item>
                                    )
                                }
                                
                                if(i.type.toLowerCase() === "logout") {
                                    return (
                                        <NavDropdown.Item href={i.link} onClick={() => i.onClick()} key={i.title + index}>
                                            {i.title}
                                        </NavDropdown.Item>
                                    )
                                }

                                if(i.type.toLowerCase() === "divider") {
                                    return (
                                        <Dropdown.Divider key={i.title + index}/>
                                    )
                                }

                                if(i.type.toLowerCase() === "header") {
                                    return (
                                        <Dropdown.Header key={item.title + index}>{i.title}</Dropdown.Header>
                                    )
                                }
                            }
                            return false
                        })}
                    </NavDropdown>
                )
            }
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href={HeaderItems.title.link} className="col mr-0">{HeaderItems.title.name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="col mr-0 justify-content-end">
                    <Nav>{
                        isAuthenticated ?
                        HeaderItems.buttons.map((item, index) => (
                            headerButtons(item, index)
                        )) : null }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
        
    )
}

export default Header
