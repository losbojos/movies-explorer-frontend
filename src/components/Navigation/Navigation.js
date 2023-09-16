import React from 'react';
import { useLocation, Link } from 'react-router-dom'

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
import './navigation__list-item.css';
import './navigation__account-icon.css';
import './navigation__account-icon_landing.css';
import './navigation__account_text.css';

function Navigation(props) {

    const { type, isLandingPage = false, onClick = null } = props;
    /* type: horizontal \ vertical */

    if (type !== 'horizontal' && type !== 'vertical') {
        throw new Error('Неверное значение параметра type компонента Navigation');
    }

    const navClasses = `navigation navigation_${type}`;
    const listClasses = `navigation__list navigation__list_${type}`;
    const iconClasses = `navigation__account-icon ${isLandingPage ? 'navigation__account-icon_landing' : ''}`;

    const locationPath = useLocation().pathname;


    const preprocessClick = () => {
        if (onClick) {
            onClick();
        }
    }


    return (
        <nav className={navClasses}>
            <ul className={listClasses}>
                {type === 'vertical' && (
                    <li className='navigation__list-item'>
                        <Link className={`navigation__link ${locationPath === PAGES.MAIN ? 'navigation__link_active' : ''}`}
                            to={PAGES.MAIN}
                            onClick={preprocessClick}
                        >Главная</Link>
                    </li>
                )}
                <li className='navigation__list-item'>
                    <Link className={`navigation__link ${locationPath === PAGES.MOVIES ? 'navigation__link_active' : ''}`}
                        to={PAGES.MOVIES}
                        onClick={preprocessClick}
                    >Фильмы</Link>
                </li>
                <li className='navigation__list-item'>
                    <Link className={`navigation__link ${locationPath === PAGES.SAVED_MOVIES ? 'navigation__link_active' : ''}`}
                        to={PAGES.SAVED_MOVIES}
                        onClick={preprocessClick}
                    >Сохранённые фильмы</Link>
                </li>

                <li className='navigation__list-item'>
                    <Link className={`navigation__link navigation__link_account ${locationPath === PAGES.PROFILE ? 'navigation__link_active' : ''}`}
                        to={PAGES.PROFILE}
                        onClick={preprocessClick}
                    >
                        <span className='navigation__account_text'>Аккаунт</span>
                        <img className={iconClasses} src={accountImage} alt="Иконка со ссылкой на страницу профиля" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;