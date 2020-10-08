import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {GetSidebar} from '../utils/api/index'
import {useAuth0} from "@auth0/auth0-react";

const Sidebar = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setLoading] = useState(true);
    const [stages, setStages] = useState([]);

    useEffect(() => {
        GetSidebar(props.id, getAccessTokenSilently)
        .then(res => {
            setStages(res)
            setLoading(false)
        });
    }, [props.id])

    const staticItems = [
        {title: 'Overview', link: `/project/${props.id}`},
        {title: 'Settings', link: `/project/${props.id}/settings`},
    ]

    return (
        <div className="col-md-2 d-sm-block bg-light text-nowrap sidenav">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <div className="nav-link">
                            <Link to={staticItems[0].link}>
                                {staticItems[0].title}
                            </Link>
                        </div>
                    </li>
                    {isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                        stages.map((item, index) => (
                        <li className="nav-item" key={item.stage_id}>
                            <div className="nav-link">
                                <Link to={`/project/${props.id}/stage/${item.stage_id}`} key={item.stage_id}>
                                    {item.name}
                                </Link>
                            </div>
                        </li>
                    ))}
                    <li className="nav-item">
                        <div className="nav-link">
                            <Link to={staticItems[1].link}>
                                {staticItems[1].title}
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
