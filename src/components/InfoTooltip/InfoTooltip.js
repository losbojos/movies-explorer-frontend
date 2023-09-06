import React from 'react';
import Popup from '../Popup/Popup'

import './info-tooltip.css';
import './info-tooltip__icon.css';
import './info-tooltip__message.css';

function InfoTooltip(props) {

    const { message, iconLink, isOpen, onClose, afterClose, title } = props;

    const combFunc = () => {
        onClose();
        if (afterClose) {
            afterClose();
        }
    }

    return (
        <Popup title={title} isOpen={isOpen} onClose={combFunc} >
            <section className="info-tooltip">
                <img className="info-tooltip__icon" src={iconLink} alt='Иконка типа сообщения' />
                <p className="info-tooltip__message">{message}</p>
            </section>
        </Popup>
    );
}

export default InfoTooltip;
