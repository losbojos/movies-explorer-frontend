import React from 'react';
import { Link } from 'react-router-dom'

import { PAGES } from '../../utils/consts';
import './guest-menu.css';
import './guest-menu__text.css';
import './guest-menu__text_register.css';
import './guest-menu__text_login.css';

function GuestMenu(props) {

    return (
        <nav className="guest-menu">
            <Link to={PAGES.REGISTER} className="guest-menu__text guest-menu__text_register">Регистрация</Link>
            <Link to={PAGES.LOGIN} className="guest-menu__text guest-menu__text_login">Войти</Link>
        </nav>
    );

}

export default GuestMenu;
