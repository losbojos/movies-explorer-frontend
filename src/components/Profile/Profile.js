import React from 'react';
import Header from '../Header/Header';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
import useFormAndValidation from '../../hooks/useFormAndValidation';

import './profile.css';
import './profile__title.css';
import './profile__inputs.css';
import './profile__label.css';
import './profile__input.css';
import './profile__input_invalid.css';
import './profile__input-container.css';
import './profile__error-span.css';
import './profile__footer.css';
import './profile__button-edit.css';
import './profile__button-exit.css';
import './profile__save-error.css';
import './profile__button-save.css';

function Profile(props) {

    const inputName = 'profileName'; // Имя инпута с именем
    const inputEmail = 'profileEmail'; // Имя инпута с email

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO
    }

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    return (
        <form className='profile' onSubmit={handleSubmit} noValidate>
            <Header />
            <h1 className="profile__title">Привет, {values[inputName] || ''}!</h1>
            <div className="profile__inputs">

                <div className="profile__input-container">
                    <label className="profile__label" htmlFor={inputName}>Имя</label>
                    <input
                        id={inputName}
                        required
                        name={inputName}
                        type="text"
                        value={values[inputName] || ''}
                        onChange={handleChange}
                        className={`profile__input ${errors[inputName] && 'profile__input_invalid'}`}
                    />
                </div>
                <ErrorSpan errors={errors[inputName]} addStyles='profile__error-span' />

                <div className="profile__input-container">
                    <label className="profile__label" htmlFor={inputEmail}>E-mail</label>
                    <input
                        id={inputEmail}
                        required
                        name={inputEmail}
                        type="email"
                        value={values[inputEmail] || ''}
                        onChange={handleChange}
                        className={`profile__input ${errors[inputEmail] && 'profile__input_invalid'}`}
                    />
                </div>
                <ErrorSpan errors={errors[inputEmail]} addStyles='profile__error-span' />

            </div>

            <div className="profile__footer">
                <button className="profile__button-edit">Редактировать</button>
                <button className="profile__button-exit">Выйти из аккаунта</button>
                <span className="profile__save-error">При обновлении профиля произошла ошибка.</span>
                <button
                    type="submit"
                    className="profile__button-save"
                    disabled={!isValid}
                >
                    Сохранить
                </button>
            </div>

        </form>
    );
}

export default Profile;