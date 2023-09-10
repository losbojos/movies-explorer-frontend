import { REST_METHODS, MAIN_SERVER, AUTH_HEADER } from './consts.js';

class MainApi {

    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
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
                    reject(`Ошибка ${res.status}: ${errorInfo}`);
                })
            }
            else {
                reject(`Ошибка ${res.status}: ${errorInfo}`);
            }
        });
    }

    register({ name, email, password }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: REST_METHODS.POST,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        }).then(res => res.ok ? res.json() : this._processError(res));
    };

    authorize({ email, password }) {
        return fetch(`${this.baseUrl}/signin`, {
            method: REST_METHODS.POST,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(res => res.ok ? res.json() : this._processError(res));
    };

    getContent(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: REST_METHODS.GET,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                [AUTH_HEADER]: `Bearer ${token}`,
            },
        })
            .then(
                res =>
                    res.ok ? res.json() :
                        this._processError(res)
            );
    };
}

const mainApiInstance = new MainApi({
    baseUrl: MAIN_SERVER
});

export default mainApiInstance;
