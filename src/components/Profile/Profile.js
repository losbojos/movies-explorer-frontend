import React, { Fragment, useState } from 'react';
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

function Profile({ handleSave, handleLogOut }) {

    const inputName = 'profileName'; // Имя инпута с именем
    const inputEmail = 'profileEmail'; // Имя инпута с email

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    const FORM_STATE = { READ: 0, EDIT: 1, SAVING: 2 };
    const [formState, setFormState] = useState(FORM_STATE.READ);
    const [lastError, setLastError] = useState("");

    const handleEdit = () => {
        setFormState(FORM_STATE.EDIT);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLastError("");
        setFormState(FORM_STATE.SAVING);
        handleSave(values)
            .then(() => setFormState(FORM_STATE.READ))
            .catch(error => {
                setLastError(error);
                setFormState(FORM_STATE.EDIT)
            })
            .finally();
    }

    const handleReset = () => {
        setLastError("");
        setFormState(FORM_STATE.READ);
        resetForm();
    }

    const handleKeyUp = (e) => {
        if (e.key === "Escape") {
            handleReset();
        }
    }

    return (
        <form
            className='profile'
            onSubmit={handleSubmit}
            // onReset={handleReset} Не работает почему то
            onKeyUp={handleKeyUp}
            noValidate>
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
                        maxLength="30"
                        disabled={formState === FORM_STATE.READ}
                        placeholder='Ваше имя'
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
                        maxLength="254"
                        disabled={formState === FORM_STATE.READ}
                        placeholder='Ваш email'
                    />
                </div>
                <ErrorSpan errors={errors[inputEmail]} addStyles='profile__error-span' />

            </div>

            <div className="profile__footer">
                {formState === FORM_STATE.READ && (
                    <Fragment>
                        <button className="profile__button-edit" type="button" onClick={handleEdit} >Редактировать</button>
                        <button className="profile__button-exit" type="button" onClick={handleLogOut} >Выйти из аккаунта</button>
                    </Fragment>
                )}
                {formState !== FORM_STATE.READ && (
                    <Fragment>
                        <span className="profile__save-error">{lastError}</span>
                        <button
                            type="submit"
                            className="profile__button-save"
                            disabled={!isValid || formState === FORM_STATE.SAVING}
                        >
                            {formState === FORM_STATE.SAVING ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </Fragment>
                )}
            </div>

        </form>
    );
}

export default Profile;