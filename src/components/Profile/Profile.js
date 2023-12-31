import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import ErrorSpan from '../ErrorSpan/ErrorSpan';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AuthorizationContext } from '../../contexts/AuthorizationContext';
import mainApiInstance from '../../utils/MainApi';
import { ERRORS, PAGES, TOKEN_STORAGE_KEY } from '../../utils/consts';
import Utils from '../../utils/Utils';

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
import './profile__save-result.css';
import './profile__save-result_error.css';
import './profile__save-result_info.css';
import './profile__button-save.css';

function Profile() {

    const navigate = useNavigate();

    const inputName = 'profileName'; // Имя инпута с именем
    const inputEmail = 'profileEmail'; // Имя инпута с email

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    const FORM_STATE = { READ: 0, EDIT: 1, SAVING: 2 };
    const [formState, setFormState] = useState(FORM_STATE.READ);
    const [lastSubmitResult, setLastSubmitResult] = useState({ text: "", isError: false });
    const [isChanged, setIsChanged] = useState(false); // Изменилось одно из значений в инпутах от текущих

    const { authorizationContext, setAuthorizationContext } = useContext(AuthorizationContext);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const setResult = (text, isError = false) => {
        setLastSubmitResult({ text, isError });
    }

    const resetInputs = () => {
        resetForm({ [inputName]: currentUser ? currentUser.name : '', [inputEmail]: currentUser ? currentUser.email : '' });
    }

    React.useEffect(() => {
        resetInputs();
    }, [currentUser]);

    useEffect(() => {

        setIsChanged(currentUser && (values[inputName] != currentUser.name || values[inputEmail] != currentUser.email));
    }, [values, currentUser]);


    const handleEdit = () => {
        setFormState(FORM_STATE.EDIT);
    }

    const handleLogOut = () => {

        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setAuthorizationContext({ loggedIn: false, token: null });
        setCurrentUser(null);

        navigate(PAGES.MAIN);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setResult('');
        setFormState(FORM_STATE.SAVING);

        mainApiInstance.setMe({ name: values[inputName], email: values[inputEmail] }, authorizationContext.token)
            .then((user) => {
                setCurrentUser(user);
                setResult(ERRORS.SAVE_PROFILE_OK);

                setTimeout(() => {
                    setFormState(FORM_STATE.READ);
                    setResult('');
                }, 2000);

            })
            .catch(error => {
                setResult(Utils.isString(error) ? error : ERRORS.SAVE_PROFILE_ERROR, true);
                setFormState(FORM_STATE.EDIT);
            });
    }

    const handleReset = () => {
        setResult('');
        setFormState(FORM_STATE.READ);
        resetInputs();
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
            onKeyUp={handleKeyUp}
            noValidate>
            <h1 className="profile__title">Привет, {currentUser ? currentUser.name : ''}!</h1>
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
                        disabled={formState !== FORM_STATE.EDIT}
                        placeholder='Ваше имя'
                        pattern='([A-Za-zА-Яа-я\s\-])+'
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
                        disabled={formState !== FORM_STATE.EDIT}
                        placeholder='Ваш email'
                        pattern='([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})'
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
                        <span className={`profile__save-result profile__save-result_${lastSubmitResult.isError ? 'error' : 'info'}`}>{lastSubmitResult ? lastSubmitResult.text : ''}</span>
                        <button
                            type="submit"
                            className="profile__button-save"
                            disabled={!isValid || formState === FORM_STATE.SAVING || !isChanged}
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