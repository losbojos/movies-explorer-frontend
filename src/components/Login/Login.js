import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import AuthForm from '../AuthForm/AuthForm';
import { PAGES, TOKEN_STORAGE_KEY } from '../../utils/consts';
import mainApiInstance from '../../utils/MainApi';
import { AuthorizationContext } from '../../contexts/AuthorizationContext'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Login() {

    const navigate = useNavigate();

    const [lastLoginError, setLastLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Текущий контекст авторизаци { loggedIn, token }
    const { setAuthorizationContext } = useContext(AuthorizationContext);

    // Текущий контекст пользователя
    const { setCurrentUser } = useContext(CurrentUserContext);

    const handleLogin = ({ email, password }) => {
        setIsLoading(true);
        mainApiInstance.authorize({ email, password })
            .then(user => {
                localStorage.setItem(TOKEN_STORAGE_KEY, user.token);
                setAuthorizationContext({ loggedIn: true, token: user.token });
                setCurrentUser(user);
                setLastLoginError(null);

                navigate(PAGES.MOVIES);
            })
            .catch(err => setLastLoginError(err))
            .finally(() => {
                setIsLoading(false);
            });

    }

    return (
        <AuthForm
            handleAuth={handleLogin}
            titleText='Рады видеть!'
            buttonSubmitText='Войти'
            lastError={lastLoginError}
            showInputName={false}
            isLoading={isLoading}
        >
            <p className="auth__text">Ещё не зарегистрированы? <Link
                to={PAGES.REGISTER}
                className="auth__link"
                style={isLoading ? { pointerEvents: "none" } : null}
            >Регистрация</Link></p>
        </AuthForm>
    );
}

export default Login;