import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Spinner } from 'react-bootstrap'
import NewStageModal from './NewStageModal'
import { navItem } from '../css/Sidebar.module.css'
import vdots from '../imgs/vdots.svg'

function Sidebar(props) {
    const [stages, setStages] = useState([])
    const [loading, setLoading] = useState(true)

    const getStages = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+"/project/"+props.id+'/stages')
        .then(res => res.json())
        .then(res => {
            setStages(res)
            setLoading(false)
        });
    }

    useEffect(() => {
        getStages();
    }, []);

    const staticItems = [
        {title: 'Overview', key: 'overview', link: `/project/${props.id}`},
        {title: 'Project Settings', key: 'project-settings', link: `/project/${props.id}/settings`},
    ]

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
                <Nav.Item key="new-stage">
                    <NewStageModal project_id={props.id} update={getStages} block/>
                </Nav.Item>
            </Nav>
            }
        </div>
    )
}

export default Sidebar;