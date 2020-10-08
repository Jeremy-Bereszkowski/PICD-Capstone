import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import {GetProject} from '../../utils/api/index'
import {useAuth0} from "@auth0/auth0-react";

// TODO: Add project owner and contributors
// TODO: Updated at needs to be updated when something in the project updates
const Project = (props) => {
    const projectID = props.match.params.projectId;

    const { getAccessTokenSilently } = useAuth0();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    /**
     * Get project details on mount
     */
    useEffect(() => {
        GetProject(projectID, getAccessTokenSilently)
        .then(res => {
            setTitle(res.project.title);
            setDescription(res.project.description);

            const created = new Date(res.project.created_at);
            const updated = new Date(res.project.updated_at);

            /**
             * Time Region for formatting
             */
            const region = 'en-AU';

            /**
             * Time Formatting Options
             */
            const timeFormatOptions = {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit"
            };

            var createdFormatted = new Intl.DateTimeFormat(region, timeFormatOptions).format(created);
            var updatedFormatted = new Intl.DateTimeFormat(region, timeFormatOptions).format(updated);

            setCreatedAt(createdFormatted);
            setUpdatedAt(updatedFormatted);
        });
    }, [projectID])

    return (
        <div>
            <div className="row justify-content-left content">
                <Sidebar id={props.match.params.projectId}/>
                <div className="col">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>
                            {title}
                            </h3>
                        </div>
                    </div>
                    <hr/>

                    <div className="row">
                        <div className="col-md-5">
                            <h5>
                                Description
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>{description}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <div className="form-group row">
                                <label htmlFor="updatedAt" className="col-md-2 col-form-label text-md-right">Updated at: </label>
                                <div className="col-md-6 form-inline">
                                    {updatedAt}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="createdAt" className="col-md-2 col-form-label text-md-right">Created at: </label>
                                <div className="col-md-6 form-inline">
                                    {createdAt}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project
