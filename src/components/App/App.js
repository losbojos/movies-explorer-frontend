import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { PAGES } from '../../utils/consts';

import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path={PAGES.MAIN} element={<Main />} />
        <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />
        <Route path="*" element={<Navigate to={PAGES.NOT_FOUNT} replace />} />
      </Routes>
    );
  }
}

export default App;
