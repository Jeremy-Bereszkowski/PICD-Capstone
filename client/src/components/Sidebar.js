import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Spinner } from 'react-bootstrap'
import { navItem } from '../css/Sidebar.module.css'

function Sidebar({stages, staticItems, loading}) {
    return (
        <div className="bg-light">
            <Nav className="flex-column">
                {staticItems.map(item => {
                    return (
                        <Nav.Item key={item.key} className={navItem}>
                            <Link to={item.link} className="nav-link">
                                {item.title}
                            </Link>
                        </Nav.Item>
                    )
                })}
            </Nav>
            <hr className="my-0"/>
            {loading? 
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" role="status" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div> : 
            <Nav className="flex-column">
                {stages.map(item => {
                    return (
                        <Nav.Item key={item.stage_id} className={navItem}>
                            <Link to={`/project/${item.project_id}/stage/${item.stage_id}`} className="nav-link">
                                {item.name}
                            </Link>
                        </Nav.Item>
                    )
                })}
                
            </Nav>
            }
        </div>
    )
}

export default Sidebar;