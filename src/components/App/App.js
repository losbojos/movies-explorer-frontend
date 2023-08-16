import React, { Component } from 'react';
import './app.css';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
