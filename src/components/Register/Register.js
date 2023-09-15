import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import AuthForm from '../AuthForm/AuthForm';
import { PAGES, TOKEN_STORAGE_KEY } from '../../utils/consts';
import mainApiInstance from '../../utils/MainApi';
import { AuthorizationContext } from '../../contexts/AuthorizationContext'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Register() {

    const navigate = useNavigate();

    const [lastRegisterError, setLastRegisterError] = useState(null);

    // Текущий контекст авторизаци { loggedIn, token }
    const { setAuthorizationContext } = useContext(AuthorizationContext);

    // Текущий контекст пользователя
    const { setCurrentUser } = useContext(CurrentUserContext);

    const handleRegister = ({ name, email, password }) => {
        mainApiInstance.register({ name, email, password })
            .then((user) => {

                localStorage.setItem(TOKEN_STORAGE_KEY, user.token);
                setAuthorizationContext({ loggedIn: true, token: user.token });
                setCurrentUser(user);
                setLastRegisterError('');

                navigate(PAGES.MOVIES);
            })
            .catch(err => {
                setLastRegisterError(err);
            });
    }

    return (
        <AuthForm
            handleAuth={handleRegister}
            titleText='Добро пожаловать!'
            buttonSubmitText='Зарегистрироваться'
            lastError={lastRegisterError}
            showInputName={true}
        >
            <p className="auth__text">Уже зарегистрированы? <Link to={PAGES.LOGIN} className="auth__link">Войти</Link></p>
        </AuthForm>
    );
}

export default Register;