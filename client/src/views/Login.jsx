import React, { useState } from 'react'
import auth from '../utils/auth';

//import Logo from '../imgs/photon_icon.png'

export default function Login(props) {

    const [error, setErr] = useState("");
  
    function handleSubmit(event) {
        event.preventDefault();
        const {email, password} = event.target.elements;

        if (email.value === "" || password.value === "")
            return

        auth.login(() => {
            window.location.reload();
        },
        email.value,
        password.value,
        (error) => {
            setErr(error.message)
        });
    }

    return (
        <main className="py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Login
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email: </label>

                                        <div className="col-md-6">
                                            <input type="text" name="email" id="email" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password: </label>

                                        <div className="col-md-6">
                                            <input type="password" name="password" id="password" className="form-control"/>
                                        </div>
                                    </div>

                                    {error !== "" &&
                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <span className="alert-danger form-control">
                                            {error}
                                            </span>
                                        </div>
                                    </div>}

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
