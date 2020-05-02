import React from 'react';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutHandler: props.logoutHandler
    }
  }
  
  const sidebarItems = [
    {title: 'item 1', link: '/'},
    {title: 'item 2', link: '/'}
  ];

  const headerItems = [
    {title: 'Logout', onClick: props.logoutHandler},
  ];

  render() {
    return (
      <body className="App">
        <Header title={process.env.REACT_APP_NAME} items={headerItems}/>
        <main>
          <Sidebar items={sidebarItems}/>
          <Dashboard />
        </main>
        <Footer messageLeft={process.env.REACT_APP_NAME} messageRight="Hello"/>
      </body>
    );
  }
}

export default App; 