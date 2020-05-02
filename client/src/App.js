import React from 'react';
import Header from './components/Header'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: "",
      logoutHandler: props.logoutHandler
    }
  }

  callAPI() {
    fetch('http://localhost:9000/dashboard/1')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        this.setState({
          ...this.state,
          projectList: data.projectList
        })
    });
  }

  componentWillMount() {
    this.callAPI();
  }

  renderTableData() {
    return Object.keys(this.state.projectList).map((key) => {
      var data = this.state.projectList[key].date_stamp.substring(5, 10).split('-');
      var date = data[1] + '-' + data[0];

      var title = this.state.projectList[key].title;

      return (
        <tr key={key}>
          <td>{date}</td>
          <td>{title}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <div><Header logoutHandler={this.state.logoutHandler}/></div>
        <div>
          <table id='table'>
            <thead>
              <tr>
                <th>DATE</th>
                <th>TITLE</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App; 