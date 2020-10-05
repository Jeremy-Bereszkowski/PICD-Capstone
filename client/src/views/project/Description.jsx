import React, { useState, useEffect } from 'react'

function Description({title, description, updated_at, created_at, ...props}) {
    return (
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
                            {updated_at}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="createdAt" className="col-md-2 col-form-label text-md-right">Created at: </label>
                        <div className="col-md-6 form-inline">
                            {created_at}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Description
