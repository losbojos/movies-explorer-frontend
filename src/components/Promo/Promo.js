import React from 'react';
import promoImage from '../../images/promo.svg';

import './promo.css';
import './promo__banner.css';
import './promo__header.css';
import './promo__text.css';
import './promo__button.css';

function Promo(props) {

    return (
        <div className="promo">
            <img className="promo__banner" alt="баннер" src={promoImage} />
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo__button" type="button">Узнать больше</button>
        </div>
    );
}

export default Promo;