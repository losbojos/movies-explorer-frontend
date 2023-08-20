import React, { Fragment } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
import './auth.css'
import Logo from '../Logo/Logo';

function AuthForm({ handleAuth, titleText, buttonSubmitText, showInputName = false, children }) {

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
                            <input id="name" required name={inputName} type="text"
                                value={values[inputName] || ''} onChange={handleChange}
                                className={`auth__input ${errors[inputName] && 'auth__input_invalid'}`}
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
                    />
                </label>
                <ErrorSpan errors={errors[inputEmail]} />

                <label className="auth__label">Пароль
                    <input id="password" required minLength="8" name={inputPwd} type="password"
                        autoComplete='off'
                        value={values[inputPwd] || ''} onChange={handleChange}
                        className={`auth__input ${errors[inputPwd] && 'auth__input_invalid'}`}
                    />
                </label>
                <ErrorSpan errors={errors[inputPwd]} />

            </div>

            <div className="auth__footer">
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