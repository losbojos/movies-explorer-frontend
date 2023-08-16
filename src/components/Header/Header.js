import React, { Fragment } from 'react';
import './header.css';
import headerLogoImage from '../../images/header__logo.svg';
import headerMenuImage from '../../images/header__menu.svg';
import { PAGES } from '../../utils/consts';

function Header() {
    // const isLogged = false;
    const isLogged = true;
    return (
        <header className="header">
            <img className="header__logo" src={headerLogoImage} alt="логотип" />
            <nav className="header__nav">
                {isLogged &&
                    (
                        <button className="header__menu"><img src={headerMenuImage}></img></button>
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