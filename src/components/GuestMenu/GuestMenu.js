import React from 'react';
import { PAGES } from '../../utils/consts';
import './guest-menu.css';
import './guest-menu__text.css';
import './guest-menu__text_register.css';
import './guest-menu__text_login.css';

function GuestMenu(props) {

    return (
        <nav className="guest-menu">
            <a href={PAGES.REGISTER} className="guest-menu__text guest-menu__text_register">Регистрация</a>
            <a href={PAGES.LOGIN} className="guest-menu__text guest-menu__text_login">Войти</a>
        </nav>
    );

}

export default GuestMenu;
