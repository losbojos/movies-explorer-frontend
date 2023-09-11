import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './movies-card-list.css';
import './movies-card-list__list-item.css';

function MoviesCardList(props) {

    const {
        movies,
        onlyLikedView,
        handleToggleLike
    } = props;

    return (
        <ul className="movies-card-list">
            {
                movies.map(movie => {
                    return (
                        <li className="movies-card-list__list-item" key={movie.movieId}>
                            <MovieCard movie={movie} onlyLikedView={onlyLikedView} handleToggleLike={handleToggleLike} />
                        </li>
                    );
                })
            }
        </ul >

    );
}

export default MoviesCardList;

