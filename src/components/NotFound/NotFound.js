import React from 'react';
import { Link } from 'react-router-dom';

import './not-found.css';
import './not-found__link.css';
import './not-found__text.css';
import './not-found__title.css';

function NotFound(props) {
    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link to={-1} className="not-found__link">Назад</Link>
        </section>
    );
}

export default NotFound;
