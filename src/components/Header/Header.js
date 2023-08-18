import React, { Fragment } from 'react';
import './header.css';
import menuImage from '../../images/menu.svg';
import { PAGES } from '../../utils/consts';
import Logo from '../Logo/Logo';

function Header() {
    // const isLogged = false;
    const isLogged = true;
    return (
        <header className="header">
            <Logo />
            <nav className="header__nav">
                {isLogged &&
                    (
                        <button className="header__menu"><img src={menuImage}></img></button>
                    )
                }
                {!isLogged &&
                    (
                        <Fragment>
                            <a href={PAGES.REGISTER} className="header__register">Регистрация</a>
                            <a href={PAGES.LOGIN} className="header__login">Войти</a>
                        </Fragment>
                    )
                }
            </nav>
        </header>
    );
}

export default Header;