import React from 'react';

import './portfolio-ref.css';
import './portfolio-ref__line.css';
import './portfolio-ref__link-container.css';
import './portfolio-ref__title.css';
import './portfolio-ref__title_pointer.css';

function PortfolioRef(props) {
    const { title, link, showline = true } = props;

    return (
        <div className="portfolio-ref">
            {showline &&
                (
                    <hr className="portfolio-ref__line"></hr>
                )
            }
            <a className="portfolio-ref__link-container" href={link} target="_blank">
                <h3 className="portfolio-ref__title">{title}</h3>
                <span className="portfolio-ref__title portfolio-ref__title_pointer">↗</span>
            </a>
        </div>
    );
}

export default PortfolioRef;