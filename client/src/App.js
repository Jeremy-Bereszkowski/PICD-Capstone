import React from 'react';
import Header from './components/Header';
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
      <Header title={process.env.REACT_APP_NAME} items={headerItems}/>
      <main>
        <Sidebar items={sidebarItems}/>
      </main>
      
      <Footer messageLeft={process.env.REACT_APP_NAME} messageRight="Hello"/>
    </div>
  );
}

export default App;