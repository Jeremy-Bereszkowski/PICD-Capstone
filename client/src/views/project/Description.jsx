import React from 'react'

import * as DateTime from '../../utils/dateTime'
import useGlobal from '../../utils/project'

const Description = ({title, description, updated_at, created_at, ...props}) => {
    const gProject = useGlobal()[0];

    return (
        <div className="col">
            <div className="row">
                <div className="col-md-6">
                    <h3>
                    {gProject.title}
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
                    <p>{gProject.description}</p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <div className="form-group row">
                        <label htmlFor="updatedAt" className="col-md-2 col-form-label text-md-right">Updated at: </label>
                        <div className="col-md-6 form-inline">
                            {DateTime.format(gProject.updated_at)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="createdAt" className="col-md-2 col-form-label text-md-right">Created at: </label>
                        <div className="col-md-6 form-inline">
                            {DateTime.format(gProject.created_at)}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Description
