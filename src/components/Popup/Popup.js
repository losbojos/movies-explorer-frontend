import React from 'react';
import { usePopupClose } from '../../hooks/usePopupClose';

import './popup.css';
import './popup_opened.css';
import './popup__title.css';
import './popup__container.css';
import './button-close.css';

/*
    props: {
        title: Заголовок
        isOpen: Открыт ли попап?
        onClose: Обработчик закрытия
        children: вложенное содержимое формы в виде JSX-разметки
    }
*/
function Popup({ title, isOpen, onClose, children }) {

    usePopupClose(isOpen, onClose);

    return (

        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="Закрыть окно"
                    className="button-close"
                    onClick={onClose}
                >
                </button>
                <h2 className="popup__title">{title}</h2>
                {children}
            </div>
        </section>
    );
}

export default Popup;
