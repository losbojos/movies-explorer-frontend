
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

const REST_METHODS = { GET: 'GET', PATCH: 'PATCH', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

const AUTH_HEADER = "authorization";

const ERRORS = {
    NOTHING_FOUND: 'Ничего не найдено',
    GET_MOVIES_ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
}

export {
    HREFS, PAGES, MOVIES_SERVER_URL, MOVIES_SERVER_API, REST_METHODS, AUTH_HEADER, ERRORS
}
