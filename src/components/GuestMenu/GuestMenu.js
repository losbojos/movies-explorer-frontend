import React from 'react';
import { PAGES } from '../../utils/consts';
import './guest-menu.css';
import './guest-menu__register.css';
import './guest-menu__login.css';

function GuestMenu(props) {

    return (
        <nav className="guest-menu">
            <a href={PAGES.REGISTER} className="guest-menu__register">Регистрация</a>
            <a href={PAGES.LOGIN} className="guest-menu__login">Войти</a>
        </nav>
    );

}

export default GuestMenu;
