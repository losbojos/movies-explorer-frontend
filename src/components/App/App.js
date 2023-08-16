import React, { Component } from 'react';
import './app.css';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
