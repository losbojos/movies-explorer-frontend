import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { PAGES } from '../../utils/consts';

function Register({ handleRegister, lastRegisterError }) {

    return (
        <AuthForm
            handleAuth={handleRegister}
            titleText='Добро пожаловать!'
            buttonSubmitText='Зарегистрироваться'
            lastError={lastRegisterError}
            showInputName={true}
        >
            <p className="auth__text">Уже зарегистрированы? <a href={PAGES.LOGIN} className="auth__link">Войти</a></p>
        </AuthForm>
    );
}

export default Register;