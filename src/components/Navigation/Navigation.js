import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navigation.css';
import { PAGES } from '../../utils/consts';
import accountImage from '../../images/account.svg';
import { usePopupClose } from '../../hooks/usePopupClose';

function Navigation(props) {
    const { isOpen, onClose } = props;
    const classNames = `navigation ${isOpen ? 'navigation_opened' : 'navigation_closed'}`;
    const navigate = useNavigate();

    usePopupClose(isOpen, onClose);

    return (
        <div className={classNames}>
            <button
                className='navigation__close-button'
                aria-label="Закрыть меню"
                onClick={onClose}>
            </button>
            <nav className='navigation__menu'>
                <ul className='navigation__list'>
                    <li className='navigation__listitem'>
                        <a className='navigation__link' href={PAGES.MAIN}>Главная</a>
                    </li>
                    <li className='navigation__listitem'>
                        <a className='navigation__link' href={PAGES.MOVIES}>Фильмы</a>
                    </li>
                    <li className='navigation__listitem'>
                        <a className='navigation__link' href={PAGES.SAVED_MOVIES}>Сохранённые фильмы</a>
                    </li>
                    <li className='navigation__listitem'>
                        <a className='navigation__link_account' href={PAGES.PROFILE}>
                            <span className='navigation__account_text'>Аккаунт</span>
                            <img className='navigation__account-icon' src={accountImage} alt="Иконка аккаунт" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;