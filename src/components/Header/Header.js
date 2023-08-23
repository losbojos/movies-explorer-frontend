import React, { Fragment, useState } from 'react';
import { PAGES } from '../../utils/consts';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

import './header.css';
import './header__nav.css';
import './header__menu-button.css';
import './header__register.css';
import './header__login.css';
import './header_bluebackground.css';

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
                        <Fragment>
                            <Navigation inHeader={true} />
                            <button className="header__menu-button" onClick={openMenu} />
                        </Fragment>
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