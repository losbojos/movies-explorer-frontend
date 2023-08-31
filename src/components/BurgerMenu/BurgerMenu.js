import React, { Fragment, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './burger-button.css';
import './burger-menu__close-button.css';
import './burger-menu.css';
import './burger-menu_opened.css';
import './burger-menu_closed.css';
import { usePopupClose } from '../../hooks/usePopupClose';

function BurgerMenu(props) {

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const burgerMenuClasses = `burger-menu ${isBurgerMenuOpen ? 'burger-menu_opened' : 'burger-menu_closed'}`;

    const closeBurgerMenu = () => {
        setIsBurgerMenuOpen(false);
    }

    const openBurgerMenu = () => {
        setIsBurgerMenuOpen(true);
    }

    usePopupClose(isBurgerMenuOpen, closeBurgerMenu);

    return (
        <Fragment>
            <button className="burger-button" onClick={openBurgerMenu} aria-label="Меню" />
            <section className={burgerMenuClasses}>
                <button
                    className='burger-menu__close-button'
                    aria-label="Закрыть меню"
                    onClick={closeBurgerMenu}>
                </button>
                <Navigation type='vertical' />
            </section>
        </Fragment>
    );
}

export default BurgerMenu;
