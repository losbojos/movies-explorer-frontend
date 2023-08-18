import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { PAGES } from '../../utils/consts';

function Register({ handleRegister }) {

    return (
        <AuthForm
            handleAuth={handleRegister}
            titleText='Добро пожаловать!'
            buttonSubmitText='Зарегистрироваться'
            showInputName={true}
        >
            <p className="auth__text">Уже зарегистрированы? <a href={PAGES.LOGIN} className="auth__text auth__text_link">Войти</a></p>
        </AuthForm>
    );
}

export default Register;