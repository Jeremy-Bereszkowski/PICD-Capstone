import React from 'react';
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

  /* render() { */
    return (
      <body className="App">
        <Header items={headerItems}/>
          {/* <Sidebar items={sidebarItems}/> */}
          <Dashboard />
        <Footer messageLeft={process.env.REACT_APP_NAME} messageRight="Hello"/>
      </body>
    );
  /* } */
}

export default App; 