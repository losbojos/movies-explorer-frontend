import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { PAGES } from '../../utils/consts';

function Login({ handleLogin, lastLoginError }) {

    return (
        <AuthForm
            handleAuth={handleLogin}
            titleText='Рады видеть!'
            buttonSubmitText='Войти'
            lastError={lastLoginError}
            showInputName={false}
        >
            <p className="auth__text">Ещё не зарегистрированы? <a href={PAGES.REGISTER} className="auth__link">Регистрация</a></p>
        </AuthForm>
    );
}

export default Login;