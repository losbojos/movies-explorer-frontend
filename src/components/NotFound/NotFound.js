import React from 'react';
import { useNavigate } from 'react-router-dom';

import './not-found.css';
import './not-found__link.css';
import './not-found__text.css';
import './not-found__title.css';

function NotFound(props) {
    const navigate = useNavigate();
    return (
        <div className="not-found">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__text">Страница не найдена</p>
            <a className="not-found__link" onClick={() => navigate(-1)}>Назад</a>
        </div>
    );
}

export default NotFound;