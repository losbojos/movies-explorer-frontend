import React, { useContext } from 'react';
import "./movie-card.css";
import './movie-card__header.css';
import './movie-card__name.css';
import './movie-card__duration.css';
import './movie-card__image.css';
import './movie-card__button.css';
import './movie-card__button_save.css';
import './movie-card__button_remove-from-all.css';
import './movie-card__button_remove-from-liked.css';

function MovieCard(props) {

    const { movie, onlyLikedView, handleToggleLike } = props;
    const { duration, image, nameRU, saved } = movie;

    const altValue = `карточка фильма ${nameRU} `;
    const ariaLabel = saved ? 'Убрать из избранных' : 'Сохранить в избранные';
    const buttonClasses = `movie-card__button ${onlyLikedView ? 'movie-card__button_remove-from-liked' : saved ? 'movie-card__button_remove-from-all' : 'movie-card__button_save'}`

    const preprocessToggleLike = () => {
        handleToggleLike(movie);
    }

    return (
        <article className="movie-card">
            <div className="movie-card__header">
                <h3 className="movie-card__name">{nameRU}</h3>
                <span className="movie-card__duration">{formatDuration(duration)}</span>
            </div >
            <img
                className="movie-card__image"
                src={image}
                alt={altValue}
            />
            <button
                className={buttonClasses}
                aria-label={ariaLabel}
                type="button"
                onClick={preprocessToggleLike}
            >{(!saved && !onlyLikedView) ? 'Сохранить' : ''}
            </button>
        </article >
    );
}

function formatDuration(duration) {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
}

export default MovieCard;