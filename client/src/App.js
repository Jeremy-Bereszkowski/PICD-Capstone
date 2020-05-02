import React from 'react';
import Header from './components/Header'
import Dashboard from './components/Dashboard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutHandler: props.logoutHandler
    }
  }

  render() {
    return (
      <body className="App">
        <Header logoutHandler={this.state.logoutHandler}/>
        <Dashboard />
      </body>
    );
  }
}

export default App; 