import React from 'react';
import PortfolioRef from '../PortfolioRef/PortfolioRef'

import './portfolio.css';
import './portfolio__header.css';
import './portfolio__list.css';
import './portfolio__list-item.css';


function Portfolio(props) {

    return (
        <section className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <PortfolioRef
                        title='Статичный сайт'
                        link='https://losbojos.github.io/how-to-learn/index.html'
                        showline={false} />
                </li>
                <li className="portfolio__list-item">
                    <PortfolioRef
                        title='Адаптивный сайт'
                        link='https://losbojos.github.io/russian-travel/index.html'
                    />
                </li>
                <li className="portfolio__list-item">
                    <PortfolioRef
                        title='Одностраничное приложение'
                        link='https://losbojos.mesto.nomoreparties.co' />
                </li>
            </ul>
        </section >
    );
}

export default Portfolio;