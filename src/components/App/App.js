import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PAGES } from '../../utils/consts';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';

import './app.css';

import image1 from '../../images/movies/img1.jpeg';
import image2 from '../../images/movies/img2.jpeg';
import image3 from '../../images/movies/img3.jpeg';
import image4 from '../../images/movies/img4.jpeg';
import image5 from '../../images/movies/img5.jpeg';

let testCounter = 0;

function App() {

  const testMovies = [
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image1 },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image2 },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image3 },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image4 },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image5 },
    // { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: "" },
  ];

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const handleSearchAll = ({ searchString, onlyShortFilms }) => {

    return new Promise((resolve, reject) => {

      // TODO: Здесь будет обращение к API за поиском
      console.log(`Running search... ${searchString}, onlyShortFilms:${onlyShortFilms}`);

      setTimeout(() => {
        setFilteredMovies(testMovies);
        resolve(); // эмулируем загрузку
      }, 2000);
    });

  }

  const handleSearchLiked = ({ searchString, onlyShortFilms }) => {

    return new Promise((resolve, reject) => {

      // TODO: Здесь будет фильтрация
      console.log(`Running search liked... ${searchString}, onlyShortFilms:${onlyShortFilms}`);

      let testLikeMovies = testMovies.slice(0, 3);

      setTimeout(() => {
        setLikedMovies(testLikeMovies);
        resolve();
      }, 3000); // эмулируем загрузку
    });

  }

  const saveProfile = (newValues) => {

    return new Promise((resolve, reject) => {

      // TODO: Здесь будет обращение к API за сохранением профиля
      console.log(`Running save profile... ${newValues}`);

      setTimeout(() => {

        if (++testCounter % 3 === 0) {
          resolve();
        } else {
          reject("При обновлении профиля произошла ошибка.");
        }

      }, 5000);
    });

  }


  return (
    <Routes>
      <Route path={PAGES.MAIN} element={<Main />} />
      <Route path={PAGES.REGISTER} element={<Register />} />
      <Route path={PAGES.LOGIN} element={<Login />} />
      <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />
      <Route path={PAGES.PROFILE} element={<Profile handleSave={saveProfile} />} />
      <Route path={PAGES.MOVIES} element={<Movies movies={filteredMovies} handleSearch={handleSearchAll} />} />
      <Route path={PAGES.SAVED_MOVIES} element={<Movies movies={likedMovies} handleSearch={handleSearchLiked} likedMovies={true} />} />
      <Route path="/" element={<Navigate to={PAGES.MAIN} replace />} />
      <Route path="*" element={<Navigate to={PAGES.NOT_FOUNT} replace />} />
    </Routes>
  );
}

export default App;
