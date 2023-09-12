import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {
  PAGES, ERRORS, MOVIES_SERVER_URL, SHORT_FILM_DURATION_MAX,
  TOKEN_STORAGE_KEY, ALL_MOVIES_FILTER_STORAGE_KEY,
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import moviesApiInstance from '../../utils/MoviesApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import errorIcon from '../../images/infotooltip/error.svg';
import mainApiInstance from '../../utils/MainApi';
import LocalStorage from '../../utils/LocalStorage';

import './app.css';
import './main.css';

const tokenStorage = new LocalStorage(TOKEN_STORAGE_KEY);
const filterStorage = new LocalStorage(ALL_MOVIES_FILTER_STORAGE_KEY, { searchString: '', onlyShortFilms: false });
const allMoviesStorage = new LocalStorage(ALL_MOVIES_LIST_STORAGE_KEY, []);
const likedMoviesStorage = new LocalStorage(LIKED_MOVIES_LIST_STORAGE_KEY, []);

function App() {

  const navigate = useNavigate();

  ////////////////////////////////////////////////////////////////////
  // Регистрация и авторизация

  // Текущий контекст авторизаци
  const [authorizationContext, setAuthorizationContext] = useState(
    { loggedIn: false, token: null }
  );

  // Текущий пользователь
  const [currentUser, setCurrentUser] = useState(null);

  const [lastRegisterError, setLastRegisterError] = useState(null);
  const [lastLoginError, setLastLoginError] = useState(null);

  const updateAuthorizationData = (isLoggedIn, newUserData, newToken) => {
    tokenStorage.save(newToken);
    setAuthorizationContext({ loggedIn: isLoggedIn, token: newToken });
    setCurrentUser(newUserData);
  }

  const handleRegister = ({ name, email, password }) => {
    mainApiInstance.register({ name, email, password })
      .then((user) => {
        updateAuthorizationData(true, user, user.token);
        setLastRegisterError('');
        navigate(PAGES.MOVIES);
      })
      .catch(err => {
        setLastRegisterError(err);
      });
  }

  const handleLogin = ({ email, password }) => {
    mainApiInstance.authorize({ email, password })
      .then(user => {
        updateAuthorizationData(true, user, user.token);
        setLastLoginError(null);
        navigate(PAGES.MOVIES);
      })
      .catch(err => setLastLoginError(err));

  }

  const handleLogOut = () => {
    setAuthorizationContext({ loggedIn: false, token: null });
    setCurrentUser(null);
    navigate(PAGES.MAIN);
  }

  const tokenCheck = () => {
    const localToken = tokenStorage.load();

    if (localToken) {
      mainApiInstance.getMe(localToken)
        .then(user => {
          updateAuthorizationData(true, user, localToken);
        })
        .catch(error => {
          //errorHandler(error);
          tokenStorage.clear();
        });
    }
  }

  useEffect(() => {
    tokenCheck(); // Проверить наличие токена 1 раз на старте
  }, []);

  ////////////////////////////////////////////////////////////////////
  // Профиль пользователя

  const saveProfile = (newValues) => {
    return mainApiInstance.setMe(newValues, authorizationContext.token);
  }

  ////////////////////////////////////////////////////////////////////
  // Данные с фильмами

  const [allMovies, setAllMovies] = useState(allMoviesStorage.load());
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(likedMoviesStorage.load());
  const [likedFilteredMovies, setLikedFilteredMovies] = useState([]);


  const [isMoviesLoaded, setIsMoviesLoaded] = useState(allMovies != null && allMovies.length > 0); // Загружены ли фильмы с внешнего сервера
  const [isLikedMoviesLoaded, setIsLikedMoviesLoaded] = useState(likedMovies != null && likedMovies.length > 0); // Загружены ли сохраненные фильмы со своего сервера

  const [isLoadingMovies, setIsLoadingMovies] = useState(false); // Состояние ожидания загрузки фильмов с сервера

  const [loadMoviesError, setLoadMoviesError] = useState(null); // Ошибка загрузки фильмов с сервера
  const [loadLikedMoviesError, setLoadLikedMoviesError] = useState(null); // Ошибка загрузки сохраненных фильмов с сервера


  const [filterOptions, setFilterOptions] = useState(filterStorage.load()); // Опции фильтрации окна всех фильмов
  const [likedFilterOptions, setLikedFilterOptions] = useState({ searchString: '', onlyShortFilms: false }); // Опции фильтрации окна всех фильмов

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


  ///////////////////////////////////
  // Обработка Поиска по всем фильмам

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
              // owner: null, // ID пользователя сохранившего фильм в любимые здесь не используется
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,

              // Вычисляемые поля
              saved: false, // Заполняется через useEffect
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

  //////////////////////////////////////////
  // Обработка Поиска по сохраненным фильмам

  const handleSearchLiked = ({ searchString, onlyShortFilms }) => {
    console.log(`Running search liked... ${searchString}, onlyShortFilms:${onlyShortFilms}`);
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
          setIsLikedMoviesLoaded(true);
        })
        .catch(error => {
          setLoadLikedMoviesError(ERRORS.GET_LIKED_MOVIES_ERROR);
          setLikedMovies([]);
          // errorHandler(error) 
        });
    } else {
      tokenStorage.clear(); // Удаление токена из локального хранилища
      filterStorage.clear(); // Удаление фильтра
      allMoviesStorage.clear();
      likedMoviesStorage.clear();
    }
  }, [authorizationContext]); // Запрос после авторизации, т.к. получаем список для текущего пользователя

  //////////////////////////////////////
  // Проставляем значение saved для сохраненных фильмов

  useEffect(() => {

    if (isMoviesLoaded && isLikedMoviesLoaded) {
      const savedMoviesIDs = new Object();

      if (likedMovies) {
        likedMovies.forEach((elem) => {
          savedMoviesIDs[elem.movieId] = elem;
        });
      }

      if (allMovies) {
        allMovies.forEach((movie) => {
          if (savedMoviesIDs.hasOwnProperty(movie.movieId)) {

            const likedMovie = savedMoviesIDs[movie.movieId];
            movie.saved = true;

            // Поля, отсутствующие в списке всех фильмов, но необходимые в некоторых запросах
            movie._id = likedMovie._id;
            movie.owner = likedMovie.owner;
          }

        });
      }
    }

  }, [isMoviesLoaded, isLikedMoviesLoaded]); // После загрузки обоих коллекций фильмов нужно пересчитать все сохраненные фильмы

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
              // Вычисляемое поле
              iMovie.saved = true;
              // Поля, отсутствующие в списке всех фильмов, пока не лайкнули
              iMovie._id = savedMovie._id;
              iMovie.owner = savedMovie.owner;
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

      console.log(`Process filtering saved movies... ${likedFilterOptions.searchString}, onlyShortFilms:${likedFilterOptions.onlyShortFilms}`);

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
    filterStorage.save(filterOptions);
  }, [filterOptions]);

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
  // JSX содержимое

  return (
    <AuthorizationContext.Provider value={authorizationContext}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <main className="main">
          <Routes>
            <Route path={PAGES.MAIN} element={<Landing />} />
            <Route path={PAGES.REGISTER} element={<Register handleRegister={handleRegister} lastRegisterError={lastRegisterError} />} />
            <Route path={PAGES.LOGIN} element={<Login handleLogin={handleLogin} lastLoginError={lastLoginError} />} />
            <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />
            <Route path={PAGES.PROFILE} element={<Profile handleSave={saveProfile} handleLogOut={handleLogOut} handleUserUpdate={setCurrentUser} />} />
            <Route path={PAGES.MOVIES} element={<Movies
              movies={filteredMovies}
              handleSearch={handleSearchAll}
              isLoadingMovies={isLoadingMovies}
              loadMoviesError={loadMoviesError}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              handleToggleLike={handleToggleLike}
            />} />
            <Route path={PAGES.SAVED_MOVIES} element={<Movies
              movies={likedFilteredMovies}
              handleSearch={handleSearchLiked}
              onlyLikedView={true}
              isLoadingMovies={null}
              loadMoviesError={loadLikedMoviesError}

              filterOptions={likedFilterOptions}
              setFilterOptions={setLikedFilterOptions}

              handleToggleLike={handleToggleLike}

            />} />
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
      </CurrentUserContext.Provider>
    </AuthorizationContext.Provider>
  );
}

export default App;
