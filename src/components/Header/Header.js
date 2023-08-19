import React, { Fragment, useState } from 'react';
import './header.css';
import { PAGES } from '../../utils/consts';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ addHeaderClass }) {

    //const isLogged = false;
    const isLogged = true;
    const headerClasses = `header ${addHeaderClass ? addHeaderClass : ''}`;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function closeMenu() {
        setIsMenuOpen(false);
    }

    function openMenu() {
        setIsMenuOpen(true);
    }

    return (
        <Fragment>
            <header className={headerClasses}>
                <Logo />
                {isLogged &&
                    (
                        <button className="header__menu-button" onClick={openMenu} />
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

            <Navigation
                isOpen={isMenuOpen}
                onClose={closeMenu}
            />

        </Fragment>

    );
}

export default Header;