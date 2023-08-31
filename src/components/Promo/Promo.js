import React from 'react';
import promoImage from '../../images/promo.svg';

import './promo.css';
import './promo__data-container.css';
import './promo__text-container.css';
import './promo__banner.css';
import './promo__header.css';
import './promo__text.css';
import './promo__button.css';

function Promo() {

    return (
        <section className="promo">
            <div className="promo__data-container">
                <img className="promo__banner" alt="баннер" src={promoImage} />
                <div className="promo__text-container">
                    <h1 className="promo__header">Учебный проект студента факультета <nobr>Веб-разработки.</nobr></h1>
                    <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
            </div>
            <a href='#about-project-section' className="promo__button">Узнать больше</a>
        </section>
    );
}

export default Promo;