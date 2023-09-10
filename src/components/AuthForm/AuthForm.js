import React, { Fragment } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
import Logo from '../Logo/Logo';

import './auth.css'
import './auth__input.css';
import './auth__input_invalid.css';
import './auth__inputs.css';
import './auth__submit.css';
import './auth__text.css';
import './auth__link.css';
import './auth__title.css';
import './auth__label.css';
import './auth__logo-container.css';
import './auth__footer.css';
import './auth__error.css';

function AuthForm({ handleAuth, titleText, buttonSubmitText, lastError, showInputName = false, children }) {

    const inputName = 'name'; // Имя инпута с именем
    const inputEmail = 'email'; // Имя инпута с email
    const inputPwd = 'password'; // Имя инпута с паролем

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAuth(values);
    }

    return (
        <form className="auth" onSubmit={handleSubmit}>
            <div className="auth__logo-container">
                <Logo />
            </div>

            <h1 className="auth__title">{titleText}</h1>
            <div className="auth__inputs">

                {showInputName && (
                    <Fragment>
                        <label className="auth__label">Имя
                            <input
                                id="name"
                                required
                                name={inputName}
                                type="text"
                                value={values[inputName] || ''}
                                onChange={handleChange}
                                className={`auth__input ${errors[inputName] && 'auth__input_invalid'}`}
                                placeholder='Ваше имя, состоящее из букв, пробела и дефиса.'
                                pattern='([A-Za-zА-Яа-я\s\-])+'
                            />
                        </label>
                        <ErrorSpan errors={errors[inputName]} />
                    </Fragment>
                )
                }

                <label className="auth__label">E-mail
                    <input id="email" required name={inputEmail} type="email"
                        value={values[inputEmail] || ''} onChange={handleChange}
                        className={`auth__input ${errors[inputEmail] && 'auth__input_invalid'}`}
                        placeholder='Ваш email'
                        pattern='([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})'
                    />
                </label>
                <ErrorSpan errors={errors[inputEmail]} />

                <label className="auth__label">Пароль
                    <input id="password" required minLength="8" name={inputPwd} type="password"
                        autoComplete='off'
                        value={values[inputPwd] || ''} onChange={handleChange}
                        className={`auth__input ${errors[inputPwd] && 'auth__input_invalid'}`}
                        placeholder='Ваш пароль'
                    />
                </label>
                <ErrorSpan errors={errors[inputPwd]} />

            </div>

            <div className="auth__footer">
                <span className="auth__error">{lastError}</span>
                <button
                    type="submit"
                    className="auth__submit"
                    disabled={!isValid}
                >
                    {buttonSubmitText}
                </button>
                {children}
            </div>
        </form>

    );
}

export default AuthForm;