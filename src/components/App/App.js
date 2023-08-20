import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import { PAGES } from '../../utils/consts';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path={PAGES.MAIN} element={<Main />} />
        <Route path={PAGES.REGISTER} element={<Register />} />
        <Route path={PAGES.LOGIN} element={<Login />} />
        <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />
        <Route path={PAGES.PROFILE} element={<Profile />} />
        <Route path={PAGES.MOVIES} element={<Movies />} />
        <Route path="/" element={<Navigate to={PAGES.MAIN} replace />} />
        <Route path="*" element={<Navigate to={PAGES.NOT_FOUNT} replace />} />
      </Routes>
    );
  }
}

export default App;
