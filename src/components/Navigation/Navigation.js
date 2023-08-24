import React from 'react';
import { PAGES } from '../../utils/consts';
import accountImage from '../../images/account.svg';

import './navigation.css';
import './navigation_horizontal.css';
import './navigation_vertical.css';
import './navigation__link.css';
import './navigation__link_account.css';
import './navigation__link_active.css';
import './navigation__list.css';
import './navigation__list_horizontal.css';
import './navigation__list_vertical.css';
import './navigation__listitem.css';
import './navigation__account-icon.css';
import './navigation__account-icon_landing.css';
import './navigation__account_text.css';

function Navigation(props) {

    const { type, isLandingPage = false } = props;
    /* type: horizontal \ vertical */

    if (type !== 'horizontal' && type !== 'vertical') {
        throw new Error('Неверное значение параметра type компонента Navigation');
    }

    const navClasses = `navigation navigation_${type}`;
    const listClasses = `navigation__list navigation__list_${type}`;
    const iconClasses = `navigation__account-icon ${isLandingPage ? 'navigation__account-icon_landing' : ''}`;

    return (
        <nav className={navClasses}>
            <ul className={listClasses}>
                <li className='navigation__listitem'>
                    <a className='navigation__link' href={PAGES.MAIN}>Главная</a>
                </li>
                <li className='navigation__listitem'>
                    <a className='navigation__link navigation__link_active' href={PAGES.MOVIES}>Фильмы</a>
                </li>
                <li className='navigation__listitem'>
                    <a className='navigation__link' href={PAGES.SAVED_MOVIES}>Сохранённые фильмы</a>
                </li>
                <li className='navigation__listitem'>
                    <a className='navigation__link_account' href={PAGES.PROFILE}>
                        <span className='navigation__account_text'>Аккаунт</span>
                        <img className={iconClasses} src={accountImage} alt="Иконка аккаунт" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;