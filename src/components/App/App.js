import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import {
  PAGES, ERRORS, MOVIES_SERVER_URL, SHORT_FILM_DURATION_MAX, ALL_MOVIES_FILTER_STORAGE_KEY,
  ALL_MOVIES_LIST_STORAGE_KEY, LIKED_MOVIES_LIST_STORAGE_KEY
} from '../../utils/consts';

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
import mainApiInstance from '../../utils/MainApi';
import LocalStorage from '../../utils/LocalStorage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import './app.css';
import './main.css';

const DEFAULT_FILTER = { searchString: '', onlyShortFilms: false };
const filterStorage = new LocalStorage(ALL_MOVIES_FILTER_STORAGE_KEY, DEFAULT_FILTER);
const allMoviesStorage = new LocalStorage(ALL_MOVIES_LIST_STORAGE_KEY, []);
const likedMoviesStorage = new LocalStorage(LIKED_MOVIES_LIST_STORAGE_KEY, []);

// Состояние списка фсех фильмов
const MOVIES_STATE = {
  EMPTY: 0, // Пустое
  LOADING: 1, // Ожидание загрузки с сервера
  READY: 2 // Загружено
}

function App() {

  // Текущий контекст авторизаци { loggedIn, token }
  const { authorizationContext } = useContext(AuthorizationContext);

  ////////////////////////////////////////////////////////////////////
  // Данные с фильмами

  const [allMovies, setAllMovies] = useState(allMoviesStorage.load());
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(likedMoviesStorage.load());
  const [likedFilteredMovies, setLikedFilteredMovies] = useState([]);

  const [allMoviesState, setAllMoviesState] = useState(allMovies != null && allMovies.length > 0 ? MOVIES_STATE.READY : MOVIES_STATE.EMPTY);
  const [isLikedMoviesLoaded, setIsLikedMoviesLoaded] = useState(likedMovies != null && likedMovies.length > 0); // Загружены ли сохраненные фильмы со своего сервера

  const [loadMoviesError, setLoadMoviesError] = useState(null); // Ошибка загрузки фильмов с сервера
  const [loadLikedMoviesError, setLoadLikedMoviesError] = useState(null); // Ошибка загрузки сохраненных фильмов с сервера

  const [allFilterOptions, setAllFilterOptions] = useState(filterStorage.load()); // Опции фильтрации окна всех фильмов
  const [likedFilterOptions, setLikedFilterOptions] = useState(DEFAULT_FILTER); // Опции фильтрации окна всех фильмов

  const isAllMoviesLoaded = () => {
    return (allMoviesState == MOVIES_STATE.READY);
  }

  //console.log('APP FUNCTION START: loggedIn= ', authorizationContext.loggedIn, '  allFilter: ', allFilterOptions);

  // Установка отфильтрованных фильмов
  useEffect(() => {
    if (isAllMoviesLoaded()) { // Пока не загрузили данные с сервера ничего не фильтруем

      // console.log('Process filtering movies... ', allFilterOptions);

      const lowerCaseSearchString = allFilterOptions.searchString.toLowerCase();
      const filtered = allMovies.filter((movie) => {
        return (!allFilterOptions.onlyShortFilms || movie.duration <= SHORT_FILM_DURATION_MAX) &&
          (movie.nameEN.toLowerCase().includes(lowerCaseSearchString) ||
            movie.nameRU.toLowerCase().includes(lowerCaseSearchString));
      });

      setFilteredMovies(filtered);
      setLoadMoviesError(filtered.length === 0 ? ERRORS.NOTHING_FOUND : null);
    }
  }, [allFilterOptions, allMoviesState]);

  ///////////////////////////////////
  // Обработка загрузки всех фильмов

  const handleSearchAll = ({ searchString, onlyShortFilms }) => {

    setAllFilterOptions({ searchString, onlyShortFilms });

    if (allMoviesState == MOVIES_STATE.EMPTY) {

      setLoadMoviesError(null);

      setAllMoviesState(MOVIES_STATE.LOADING);

      // console.log(`Process server movies request... `);

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
              // owner: null, // ID пользователя сохранившего фильм в любимые здесь не используется
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,

              // Вычисляемые поля
              saved: false, // Заполняется через useEffect
            }
          }));
          calculateLiked();
          setAllMoviesState(MOVIES_STATE.READY);
        })
        .catch(error => {
          setLoadMoviesError(ERRORS.GET_MOVIES_ERROR);
          setAllMovies([]);
          // errorHandler(error);
          setAllMoviesState(MOVIES_STATE.EMPTY);
        });
    }
  }

  //////////////////////////////////////////
  // Обработка Поиска по сохраненным фильмам

  const handleSearchLiked = ({ searchString, onlyShortFilms }) => {
    // console.log(`Running search liked... ${searchString}, onlyShortFilms:${onlyShortFilms}`);
    setLikedFilterOptions({ searchString, onlyShortFilms });
  }

  //////////////////////////////////////
  // Запрос сохраненных фильмов

  useEffect(() => {

    if (authorizationContext.loggedIn) {

      mainApiInstance.getMovies(authorizationContext.token)
        .then(movies => {

          const newLikedMovies = movies.map((iMovie) => {
            iMovie.saved = true;
            //delete iMovie._id; // Нельзя удалять, т.к. нужен для последующего удаления экземпляра из собственной базы при снятии лайка
            delete iMovie.__v;
            return iMovie;
          });

          setLikedMovies(newLikedMovies);
          calculateLiked();
          setIsLikedMoviesLoaded(true);
        })
        .catch(error => {
          console.log(error);
          setLoadLikedMoviesError(ERRORS.GET_LIKED_MOVIES_ERROR);
          setLikedMovies([]);
          // errorHandler(error) 
        });
    } else {
      setAllMovies([]);
      setFilteredMovies([]);
      setLikedMovies([]);
      setLikedFilteredMovies([]);
      setAllMoviesState(MOVIES_STATE.EMPTY);
      setIsLikedMoviesLoaded(false);
      setLoadMoviesError(null);
      setLoadLikedMoviesError(null);
      setAllFilterOptions(DEFAULT_FILTER);
      setLikedFilterOptions(DEFAULT_FILTER);

      filterStorage.clear();
      allMoviesStorage.clear();
      likedMoviesStorage.clear();
    }
  }, [authorizationContext]); // Запрос после авторизации, т.к. получаем список для текущего пользователя

  //////////////////////////////////////
  // Проставляем значение saved для сохраненных фильмов

  const applyLikedStatus = (movie, likedMovie) => {
    // Вычисляемое поле
    movie.saved = true;

    // Поля, отсутствующие в списке всех фильмов, пока не лайкнули, но необходимые в некоторых запросах (дизлайк)
    movie._id = likedMovie._id;
    movie.owner = likedMovie.owner;
  }

  const calculateLiked = () => {
    // только после загрузки обоих коллекций фильмов нужно пересчитать все сохраненные фильмы    
    if (isAllMoviesLoaded() && isLikedMoviesLoaded) {
      const savedMoviesIDs = new Object();

      if (likedMovies) {
        likedMovies.forEach((elem) => {
          savedMoviesIDs[elem.movieId] = elem;
        });
      }

      if (allMovies) {

        let isSomeChanged = false;
        const newAllMovies = allMovies.map((movie) => {
          if (savedMoviesIDs.hasOwnProperty(movie.movieId)) {
            const likedMovie = savedMoviesIDs[movie.movieId];
            applyLikedStatus(movie, likedMovie);
            isSomeChanged = true;
          }
          return movie;
        });
        if (isSomeChanged) {
          setAllMovies(newAllMovies);
        }
      }
    }
  }

  //////////////////////////////////////
  // Обработка переключения лайка (сохранить\удалить в\из избранных)

  const handleToggleLike = (movie) => {

    if (movie.saved) {
      mainApiInstance.deleteMovie(movie._id, authorizationContext.token)
        .then(deletedMovie => {
          setLikedMovies(likedMovies.filter(iMovie => iMovie.movieId !== deletedMovie.movieId));

          const newAllMovies = allMovies.map((iMovie) => {
            if (iMovie.movieId === deletedMovie.movieId)
              iMovie.saved = false;
            return iMovie;
          });
          setAllMovies(newAllMovies);
        })
        .catch(error => errorHandler(error));

    } else {
      const savingMovie = { ...movie };
      delete savingMovie.saved;
      delete savingMovie._id;
      delete savingMovie.owner;

      mainApiInstance.saveMovie(savingMovie, authorizationContext.token)
        .then(savedMovie => {
          savedMovie.saved = true;
          setLikedMovies([...likedMovies, savedMovie]);

          const newAllMovies = allMovies.map((iMovie) => {
            if (iMovie.movieId === savedMovie.movieId) {
              applyLikedStatus(iMovie, savedMovie);
            }
            return iMovie;
          });
          setAllMovies(newAllMovies);

        })
        .catch(error => errorHandler(error));
    }
  }

  ////////////////////////////////////////////////////////////////////
  // Установка отфильтрованных сохраненных фильмов

  useEffect(() => {
    if (isLikedMoviesLoaded) { // Пока не загрузили данные с сервера ничего не фильтруем

      //console.log(`Process filtering saved movies... ${likedFilterOptions.searchString}, onlyShortFilms:${likedFilterOptions.onlyShortFilms}`);

      const lowerCaseSearchString = likedFilterOptions.searchString.toLowerCase();
      const filtered = likedMovies.filter((movie) => {
        return (!likedFilterOptions.onlyShortFilms || movie.duration <= SHORT_FILM_DURATION_MAX) &&
          (movie.nameEN.toLowerCase().includes(lowerCaseSearchString) ||
            movie.nameRU.toLowerCase().includes(lowerCaseSearchString));
      });

      setLikedFilteredMovies(filtered);
      setLoadLikedMoviesError(filtered.length === 0 ? ERRORS.NOTHING_FOUND : null);
    }
  }, [likedFilterOptions, likedMovies, isLikedMoviesLoaded]);

  /////////////////////////////////////////////////////////////////////////////////////////
  // Сохранение в локальном хранилище параметров фильтрации и загруженных с сервера фильмов

  useEffect(() => {
    filterStorage.save(allFilterOptions);
  }, [allFilterOptions]);

  useEffect(() => {
    allMoviesStorage.save(allMovies);
  }, [allMovies]);

  useEffect(() => {
    likedMoviesStorage.save(likedMovies);
  }, [likedMovies]);

  ////////////////////////////////////////////////////////////////////
  // Обработка ошибок и всплывающих сообщений

  function errorHandler(error, afterClose = null) {
    console.log(error);
    //alert(error);

    let errorMessage = (typeof error === 'string' || error instanceof String) ? error : ('message' in error) ? error.message : error.toString();

    handleInfoTooltip('Ошибка', errorMessage, errorIcon, afterClose);
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
  // JSX содержимое App

  return (
    <Fragment>
      <Header />

      <main className="main">
        <Routes>
          <Route path={PAGES.MAIN} element={<Landing />} />
          <Route path={PAGES.REGISTER} element={<Register />} />
          <Route path={PAGES.LOGIN} element={<Login />} />
          <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />


          <Route path={PAGES.PROFILE}
            element={<ProtectedRoute element={Profile} />}
          />


          <Route path={PAGES.MOVIES}
            element={<ProtectedRoute element={Movies}

              /* Render the Same Component with Different props Inside React Router:
              Use the key prop to ensure that the component is re-rendered when the route changes. */
              key="movies"

              movies={filteredMovies}
              handleSearch={handleSearchAll}
              isLoadingMovies={allMoviesState == MOVIES_STATE.LOADING}
              loadMoviesError={loadMoviesError}
              filterOptions={allFilterOptions}
              setFilterOptions={setAllFilterOptions}
              handleToggleLike={handleToggleLike}
            />}
          />

          <Route path={PAGES.SAVED_MOVIES}
            element={<ProtectedRoute element={Movies}

              /* Render the Same Component with Different props Inside React Router:
              Use the key prop to ensure that the component is re-rendered when the route changes. */
              key="saved-movies"

              movies={likedFilteredMovies}
              handleSearch={handleSearchLiked}
              onlyLikedView={true}
              isLoadingMovies={false}
              loadMoviesError={loadLikedMoviesError}

              filterOptions={likedFilterOptions}
              setFilterOptions={setLikedFilterOptions}

              handleToggleLike={handleToggleLike}
            />}
          />

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
    </Fragment>
  );
}

export default App;
