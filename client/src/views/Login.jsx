import React from 'react';
import LoginButton from "../components/LoginButton";

export default function Login(props) {
    return (
        <main className="py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <h1>
                                        Welcome back!
                                    </h1>
                                </div>
                                <br/>
                                <div className="d-flex justify-content-center">
                                    <LoginButton />
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
