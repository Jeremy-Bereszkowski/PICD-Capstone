import React, { Component } from 'react'
import Sidebar from '../../../components/Sidebar'

class StageTest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            project_id: "",
            err: ""
        }
    }

    render() {
        return (
            <div className="col">
                <div className="row justify-content-left">
                    <Sidebar id={this.props.match.params.id}/>
                    <div className="col">
                        <div className="row">
                            <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                            <div className="col-md-6">
                                <h3>
                                    Test Stage
                                </h3>
                            </div>
                        </div>
                        <hr/>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default StageTest