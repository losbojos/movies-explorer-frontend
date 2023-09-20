import React from 'react';
import LandingSection from '../LandingSection/LandingSection';

import './portfolio.css';
import './portfolio__header.css';
import './portfolio__list.css';
import './portfolio__list-item.css';
import './portfolio__link.css';


function Portfolio(props) {

    return (
        <LandingSection innerSectionClass="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a className="portfolio__link" href='https://losbojos.github.io/how-to-learn/index.html' target="_blank">Статичный сайт</a>
                </li>
                <li className="portfolio__list-item">
                    <a className="portfolio__link" href='https://losbojos.github.io/russian-travel/index.html' target="_blank">Адаптивный сайт</a>
                </li>
                <li className="portfolio__list-item">
                    <a className="portfolio__link" href='https://losbojos.mesto.nomoreparties.co' target="_blank">Одностраничное приложение</a>
                </li>
            </ul>
        </LandingSection>
    );
}

export default Portfolio;