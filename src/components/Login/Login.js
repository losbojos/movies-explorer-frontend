import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { PAGES } from '../../utils/consts';

function Login({ handleLogin }) {

    return (
        <AuthForm
            handleAuth={handleLogin}
            titleText='Рады видеть!'
            buttonSubmitText='Войти'
            showInputName={false}
        >
            <p className="auth__text">Ещё не зарегистрированы? <a href={PAGES.REGISTER} className="auth__text auth__text_link">Регистрация</a></p>
        </AuthForm>
    );
}

export default Login;