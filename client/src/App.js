import React from 'react';
import Header from './components/Header'

function App(props) {
  return (
    <div className="App">
      <Header logoutHandler={props.logoutHandler}/>
    </div>
  );
}

export default App; 