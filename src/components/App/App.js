import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { PAGES, ERRORS, MOVIES_SERVER_URL, SHORT_FILM_DURATION_MAX } from '../../utils/consts';

import Landing from '../Landing/Landing';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { AuthorizationContext } from '../../contexts/AuthorizationContext'
import moviesApiInstance from '../../utils/MoviesApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import errorIcon from '../../images/infotooltip/error.svg';

import './app.css';
import './main.css';

import image1 from '../../images/movies/img1.jpeg';
import image2 from '../../images/movies/img2.jpeg';
import image3 from '../../images/movies/img3.jpeg';
import image4 from '../../images/movies/img4.jpeg';
import image5 from '../../images/movies/img5.jpeg';

let testCounter = 0;

function App() {

  // Текущий контекст авторизаци
  const [authorizationContext, setAuthorizationContext] = useState(
    { loggedIn: false }
  );

  const navigate = useNavigate();

  ////////////////////////////////////////////////////////////////////
  // Данные с фильмами

  const testMovies = [
    { movieId: 1, nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image1 },
    { movieId: 2, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image2 },
    { movieId: 3, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image3 },
    { movieId: 4, nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image4 },
    { movieId: 5, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image5 },
    { movieId: 6, nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image1 },
    { movieId: 7, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image2 },
    { movieId: 8, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image3 },
    { movieId: 9, nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image4 },
    { movieId: 10, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image5 },
    { movieId: 11, nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: image4 },
    { movieId: 12, nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: image5 },
  ];

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(testMovies.slice(0, 3));

  const [isMoviesLoaded, setIsMoviesLoaded] = useState(false); // Загружены ли фильмы с сервера
  const [isLoadingMovies, setIsLoadingMovies] = useState(false); // Состояние ожидания загрузки фильмов с сервера
  const [loadMoviesError, setLoadMoviesError] = useState(null); // Ошибка загрузки фильмов с сервера
  const [filterOptions, setFilterOptions] = useState({ searchString: '', onlyShortFilms: false }); // Опции фильтрации

  // Установка отфильтрованных фильмов
  useEffect(() => {
    if (isMoviesLoaded) { // Пока не загрузили данные с сервера ничего не фильтруем

      console.log(`Process filtering movies... ${filterOptions.searchString}, onlyShortFilms:${filterOptions.onlyShortFilms}`);

      const lowerCaseSearchString = filterOptions.searchString.toLowerCase();
      const filtered = allMovies.filter((movie) => {
        return (!filterOptions.onlyShortFilms || movie.duration <= SHORT_FILM_DURATION_MAX) &&
          (movie.nameEN.toLowerCase().includes(lowerCaseSearchString) ||
            movie.nameRU.toLowerCase().includes(lowerCaseSearchString));
      });

      setFilteredMovies(filtered);
      setLoadMoviesError(filtered.length === 0 ? ERRORS.NOTHING_FOUND : null);
    }
  }, [filterOptions, allMovies, isMoviesLoaded]);

  ////////////////////////////////////////////////////////////////////
  // Запрос всех фильмов

  const handleSearchAll = ({ searchString, onlyShortFilms }) => {

    setFilterOptions({ searchString, onlyShortFilms });

    if (!isMoviesLoaded) {

      setLoadMoviesError(null);
      setIsLoadingMovies(true);

      console.log(`Process server movies request... `);

      return moviesApiInstance.getMovies()
        .then(result => {
          setAllMovies(result.map((movie) => {

            return {
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: MOVIES_SERVER_URL + movie.image.url,
              trailerLink: movie.trailerLink,
              thumbnail: MOVIES_SERVER_URL + movie.image.formats.thumbnail.url,
              owner: null, // Здесь ID пользователя сохранившего фильм в любимые
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              saved: false, // saved вычислять по ID пользователя
            }
          }));
          setIsMoviesLoaded(true);
        })
        .catch(error => {
          setLoadMoviesError(ERRORS.GET_MOVIES_ERROR);
          setAllMovies([]);
          // errorHandler(error);
        })
        .finally(() => {
          setIsLoadingMovies(false);
        });
    }
  }

  ////////////////////////////////////////////////////////////////////

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

        if (++testCounter % 2 === 0) {
          resolve();
        } else {
          reject("При обновлении профиля произошла ошибка.");
        }

      }, 3000);
    });

  }

  const handleLogin = () => {
    setAuthorizationContext({ loggedIn: true });
    navigate(PAGES.MOVIES);
  }

  const handleLogOut = () => {
    setAuthorizationContext({ loggedIn: false });
    navigate(PAGES.MAIN);
  }

  ////////////////////////////////////////////////////////////////////
  // Обработка ошибок и всплывающих сообщений

  function errorHandler(error, afterClose = null) {
    console.log(error);

    //alert(error);
    handleInfoTooltip('Ошибка', error.message, errorIcon, afterClose);
  }

  const infoTooltipInitial =
  {
    isOpen: false, // Открыт попап с информационным сообщением?
    title: '',
    message: '',
    iconSource: '',
    afterClose: null
  }

  // Текст и иконка для всплывающего сообщения
  const [infoTooltip, setInfoTooltip] = useState(infoTooltipInitial);

  function handleInfoTooltip(title, msg, iconSource, afterClose = null) {
    setInfoTooltip({
      isOpen: true,
      title: title,
      message: msg,
      iconSource: iconSource,
      afterClose: afterClose
    });
  }

  ////////////////////////////////////////////////////////////////////

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      <Header />
      <main className="main">
        <Routes>
          <Route path={PAGES.MAIN} element={<Landing />} />
          <Route path={PAGES.REGISTER} element={<Register handleRegister={handleLogin} />} />
          <Route path={PAGES.LOGIN} element={<Login handleLogin={handleLogin} />} />
          <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />
          <Route path={PAGES.PROFILE} element={<Profile handleSave={saveProfile} handleLogOut={handleLogOut} />} />
          <Route path={PAGES.MOVIES} element={<Movies movies={filteredMovies} handleSearch={handleSearchAll} isLoadingMovies={isLoadingMovies} loadMoviesError={loadMoviesError} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />} />
          {/* <Route path={PAGES.MOVIES} element={<Movies movies={filteredMovies} handleSearch={handleSearchAll} isLoadingMovies={true} loadMoviesError={null} />} /> */}
          <Route path={PAGES.SAVED_MOVIES} element={<Movies movies={likedMovies} handleSearch={handleSearchLiked} likedMovies={true} />} />
          <Route path="*" element={<Navigate to={PAGES.NOT_FOUNT} replace />} />
        </Routes>
      </main >
      <Footer />

      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={() => {
          setInfoTooltip(infoTooltipInitial);
        }}
        afterClose={infoTooltip.afterClose}
        message={infoTooltip.message}
        iconLink={infoTooltip.iconSource}
        title={infoTooltip.title}
      />

    </AuthorizationContext.Provider>
  );
}

export default App;
