import { MOVIES_SERVER_URL, MOVIES_SERVER_API, REST_METHODS } from './consts.js';

class MoviesApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    getMovies() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: REST_METHODS.GET,
            // credentials: "include", // Для тестирования можно сэмулировать ошибку
            headers: myHeaders,
        };

        return fetch(this._baseUrl, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${response.status}`);
            });
    }
}

const moviesApiInstance = new MoviesApi(MOVIES_SERVER_URL + MOVIES_SERVER_API);

export default moviesApiInstance;