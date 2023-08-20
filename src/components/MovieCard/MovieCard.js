import React, { useContext } from 'react';
import "./moviecard.css";

function MovieCard(props) {

    const { duration, image, nameRU, saved } = props;

    const altValue = `карточка фильма ${nameRU} `;
    const ariaLabel = saved ? 'Убрать из избранных' : 'Сохранить в избранные';

    return (
        <article className="moviecard">
            <div className="moviecard__header">
                <h3 className="moviecard__name">{nameRU}</h3>
                <span className="moviecard__duration">{duration}</span>
            </div>
            <img
                className="moviecard__image"
                src={image}
                alt={altValue}
            />
            <button
                className={`moviecard__button ${saved ? 'moviecard__button_remove-from-all' : 'moviecard__button_save'}`}
                aria-label={ariaLabel}
                type="button"
            >{!saved && 'Сохранить'}
            </button>
        </article >
    );
}

export default MovieCard;