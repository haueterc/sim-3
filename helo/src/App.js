import React, { Component } from 'react';
import Nav from './component/Nav/Nav';
import route from './route';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav></Nav>
        { route }
      </div>
    );
  }
}

export default App;
