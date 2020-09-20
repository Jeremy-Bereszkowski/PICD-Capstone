import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
import auth from '../utils/auth'

function Header(props) {
    const headerButtons = (item, index) => {
        if(item.clearance.toLowerCase() === "all" || item.clearance.toLowerCase() === auth.getClearance().toLowerCase()) {
            if(item.type.toLowerCase() === "link") {
                    return (
                        <Nav.Link href={item.link}>{item.title}</Nav.Link>
                    )
            }
            
            if(item.type.toLowerCase() === "logout") {
                return (
                    <Nav.Link onclick={item.onclick}>{item.title}</Nav.Link>
                )
            }

            if(item.type === "menu") {
                return (
                    <NavDropdown title={item.title} id="basic-nav-dropdown" drop="down" alignRight>
                        {item.menu.map((i, index) => {
                            if(i.clearance.toLowerCase() === "all" || i.clearance.toLowerCase() === auth.getClearance().toLowerCase()) {
                                if(i.type.toLowerCase() === "link") {
                                    return (
                                        <NavDropdown.Item href={i.link} eventKey={index}>{i.title}</NavDropdown.Item>
                                    )
                                }
                                
                                if(i.type.toLowerCase() === "logout") {
                                    return (
                                        <NavDropdown.Item href={i.link} onClick={() => i.onClick()} eventKey={index}>
                                            {i.title}
                                        </NavDropdown.Item>
                                    )
                                }

                                if(i.type.toLowerCase() === "divider") {
                                    return (
                                        <Dropdown.Divider />
                                    )
                                }

                                if(i.type.toLowerCase() === "header") {
                                    return (
                                        <Dropdown.Header>{i.title}</Dropdown.Header>
                                    )
                                }
                            }
                        })}
                    </NavDropdown>
                )
            }
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href={props.items.title.link} className="col mr-0">{props.items.title.name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="col mr-0 justify-content-end">
                    <Nav>
                        {props.items.buttons.map((item, index) => (
                            headerButtons(item, index)
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
        
    )
}

export default Header
