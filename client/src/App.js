import React from 'react'
import Header from './components/Header'
import Router from './authRoutes'
import Footer from './components/Footer'
/* import Sidebar from './components/Sidebar'; */


function App(props) {

  const headerItems = [
    {title: 'Logout', onClick: props.logoutHandler},
  ];

  return (
    <div className="App">
      <Header items={headerItems} />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App; 