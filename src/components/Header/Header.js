import React from 'react';
import './header.css';
import { PAGES } from '../../utils/consts';
import Logo from '../Logo/Logo';

function Header({ addHeaderClass }) {
    //const isLogged = false;
    const isLogged = true;
    const headerClasses = `header ${addHeaderClass ? addHeaderClass : ''}`;

    return (
        <header className={headerClasses}>
            <Logo />
            {isLogged &&
                (
                    <button className="header__menu" />
                )
            }
            {!isLogged &&
                (
                    <nav className="header__nav">
                        <a href={PAGES.REGISTER} className="header__register">Регистрация</a>
                        <a href={PAGES.LOGIN} className="header__login">Войти</a>
                    </nav>
                )
            }
        </header>
    );
}

export default Header;