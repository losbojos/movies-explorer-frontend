import React from 'react';
import './portfolio.css';
import Navtab from '../Navtab/Navtab'

function Portfolio(props) {

    return (
        <div className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__listitem">
                    <Navtab
                        title='Статичный сайт'
                        link='https://losbojos.github.io/russian-travel/index.html'
                        showline={false} />
                </li>
                <li className="portfolio__listitem">
                    <Navtab
                        title='Адаптивный сайт'
                        link='https://losbojos.github.io/russian-travel/index.html'
                    />
                </li>
                <li className="portfolio__listitem">
                    <Navtab
                        title='Одностраничное приложение'
                        link='https://losbojos.mesto.nomoreparties.co' />
                </li>
            </ul>
        </div >
    );
}

export default Portfolio;