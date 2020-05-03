import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App(props) {
  
  const sidebarItems = [
    {title: 'item 1', link: '/'},
    {title: 'item 2', link: '/'}
  ];

  const headerItems = [
    {title: 'Logout', onClick: props.logoutHandler},
  ];

  return (
    <div className="App">
      <Router>
        <Header items={headerItems}/>
        <main>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          {/* <Route path="/project" component={Project}/> */}
        </main>
        <Footer messageLeft={'\u00A9 PICD - 2020 RMIT Capstone Project'} messageRight={"Brenton Holloway, Jeremy Bereszkowski"} />
      </Router>
    </div>
  );
}

export default App; 