import React from 'react';
import { useNavigate } from 'react-router-dom';

import './notfound.css';
import './notfound__link.css';
import './notfound__text.css';
import './notfound__title.css';

function NotFound(props) {
    const navigate = useNavigate();
    return (
        <div className="notfound">
            <h2 className="notfound__title">404</h2>
            <p className="notfound__text">Страница не найдена</p>
            <a className="notfound__link" onClick={() => navigate(-1)}>Назад</a>
        </div>
    );
}

export default NotFound;