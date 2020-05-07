import React from 'react'
import Header from './components/Header'
import Router from './authRoutes'
import Footer from './components/Footer'
/* import Sidebar from './components/Sidebar'; */

function App(props) {
  
  /* const sidebarItems = [
    {title: 'item 1', link: '/'},
    {title: 'item 2', link: '/'}
  ];
 */
  const headerItems = [
    {title: 'Logout', onClick: props.logoutHandler},
  ];

  return (
    <div className="App">
      <main>
        <Header items={headerItems} />
        <Router />
        <Footer />
      </main>
    </div>
  );
}

export default App; 