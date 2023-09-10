
const HREFS = {
    GITHUB: "https://github.com/losbojos",
    YANDEX_PRACTICUM: "https://practicum.yandex.ru",
}

const PAGES = {
    MAIN: "/",
    LOGIN: "/signin",
    REGISTER: "/signup",
    MOVIES: "/movies",
    SAVED_MOVIES: "/saved-movies",
    PROFILE: "/profile",
    NOT_FOUNT: "/404",
};

const MOVIES_SERVER_URL = 'https://api.nomoreparties.co';
const MOVIES_SERVER_API = '/beatfilm-movies';

// const MAIN_SERVER = 'https://api.lifemovie.nomoreparties.co';
const MAIN_SERVER = 'http://localhost:3003';

const REST_METHODS = { GET: 'GET', PATCH: 'PATCH', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

const AUTH_HEADER = "authorization";

const ERRORS = {
    NOTHING_FOUND: 'Ничего не найдено',
    GET_MOVIES_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
}

const SHORT_FILM_DURATION_MAX = 40; // Максимальная длительность короткометражки включительно

const TOKEN_STORAGE_KEY = 'jwt';


export {
    HREFS, PAGES, MOVIES_SERVER_URL, MOVIES_SERVER_API, MAIN_SERVER, REST_METHODS, AUTH_HEADER, ERRORS, SHORT_FILM_DURATION_MAX, TOKEN_STORAGE_KEY
}
