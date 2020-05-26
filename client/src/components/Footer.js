import React, { Component } from 'react'
import '../css/Footer.css'

export class Footer extends Component {
    render() {
        return (
            <footer className="bg-white px-4 py-2">
                <div className="row justify-content-center">
                    <span className="text-muted left">&copy; PICD - 2020 RMIT Capstone Project</span>
                    <span className="text-muted right">Brenton Holloway, Jeremy Bereszkowski</span>
                </div>
            </footer>
        )
    }
}

export default Footer
