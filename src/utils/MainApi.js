import { REST_METHODS, MAIN_SERVER, AUTH_HEADER } from './consts.js';

class MainApi {

    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _processError(res, conversionMap = null) {
        return new Promise((resolve, reject) => {
            let errorInfo = res.statusText;
            if (conversionMap && conversionMap[res.status])
                errorInfo = conversionMap[res.status];
            if (res.body) {
                res.json().then(jsonObj => {
                    if (jsonObj && jsonObj.message) {
                        errorInfo = jsonObj.message;
                    }
                    console.log('processError: ', jsonObj);
                    reject(`Ошибка ${res.status}: ${errorInfo}`);
                })
            }
            else {
                reject(`Ошибка ${res.status}: ${errorInfo}`);
            }
        });
    }

    _requestServer(urlAddition, method, bodyObject = null, token = null) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (token) {
            myHeaders.append([AUTH_HEADER], `Bearer ${token}`);
        }

        const requestOptions = {
            method: method,
            credentials: "include",
            headers: myHeaders,
        };

        if (bodyObject)
            requestOptions.body = JSON.stringify(bodyObject);

        return fetch(this._baseUrl + urlAddition, requestOptions)
            .then(response =>
                response.ok ? response.json()
                    : this._processError(response)
            );
    }

    register({ name, email, password }) {
        return this._requestServer('/signup', REST_METHODS.POST, { name, email, password });
    };

    authorize({ email, password }) {
        return this._requestServer('/signin', REST_METHODS.POST, { email, password });
    };

    getMe(token) {
        return this._requestServer('/users/me', REST_METHODS.GET, null, token);
    };

    setMe({ name, email }, token) {
        return this._requestServer('/users/me', REST_METHODS.PATCH, { name, email }, token);
    }

    getMovies(token) {
        return this._requestServer('/movies', REST_METHODS.GET, null, token);
    }

    saveMovie(movie, token) {
        return this._requestServer('/movies', REST_METHODS.POST, movie, token);
    }

    deleteMovie(movieId, token) {
        return this._requestServer(`/movies/${movieId}`, REST_METHODS.DELETE, null, token);
    }

}

const mainApiInstance = new MainApi({
    baseUrl: MAIN_SERVER
});

export default mainApiInstance;
