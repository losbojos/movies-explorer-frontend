import React from 'react';
import './profile.css';
import Header from '../Header/Header';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function Profile({ onSubmit, name, email }) {

    const inputName = 'name'; // Имя инпута с именем
    const inputEmail = 'email'; // Имя инпута с email

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    }

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    return (
        <form className='profile' onSubmit={handleSubmit}>
            <Header />
            <h1 className="profile__title">Привет, {name}!</h1>
            <div className="profile__inputs">

                <div className="profile__input-container">
                    <label className="profile__label" for="name">Имя</label>
                    <input id="name" required name={inputName} type="text"
                        value={values[inputName] || ''} onChange={handleChange}
                        className={`profile__input ${errors[inputName] && 'profile__input_invalid'}`}
                    />
                </div>
                <ErrorSpan errors={errors[inputName]} addStyles='profile__error-span' />

                <div className="profile__input-container">
                    <label className="profile__label" for="email">E-mail</label>
                    <input id="email" required name={inputEmail} type="email"
                        value={values[inputEmail] || ''} onChange={handleChange}
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
                    className={`profile__button-save cursor-pointer ${!isValid && 'profile__button-save_disabled'}`}
                >
                    Сохранить
                </button>
            </div>

        </form>
    );
}

export default Profile;