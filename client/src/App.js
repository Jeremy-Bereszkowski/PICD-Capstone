import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { MainSwitch } from './utils/switch/index'
import { Loading, Header, Footer } from "./components/index";
import './css/App.css';

const App = () => {
    const { isLoading } = useAuth0();

    /**
     * Route - Used if all users need access to the page including unauthorized users
     *
     * PublicRoute - Used if only unauthorized user are to have access to the route (Used for login and sign up pages)
     *
     * ProtectedRoute - Used only if authorized user are to have access to the route
     */
    return (
        <div className="App">
            <Header/>
            { isLoading ? <Loading /> : <MainSwitch /> }
            <Footer/>
        </div>
    );
}

export default App; 
