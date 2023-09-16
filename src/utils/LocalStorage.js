
// Сохранение в локальном хранилище параметров фильтрации и загруженных фильмов
class LocalStorage {

    constructor(storageKey, defaultValue = null) {
        this._storageKey = storageKey;
        this._defaultValue = defaultValue;
    }

    save(value) {
        localStorage.setItem(this._storageKey, JSON.stringify(value));
    }

    load() {
        let result = this._defaultValue;

        const jsonObject = localStorage.getItem(this._storageKey);
        if (jsonObject) {
            try {
                result = JSON.parse(jsonObject);
            }
            catch (err) {
                console.log(err);
            }
        }

        return result;
    }

    clear() {
        localStorage.removeItem(this._storageKey);
    }
}

export default LocalStorage;