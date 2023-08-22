import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './moviescardlist.css';

function MoviesCardList(props) {

    const {
        movies,
        likedMovies
    } = props;

    return (
        <ul className="moviescardlist">
            {
                movies.map(movie => {
                    return (
                        <li className="moviescardlist__listitem" key={movie._id}>
                            <MovieCard movie={movie} likedMoviesView={likedMovies} />
                        </li>
                    );
                })
            }
        </ul >

    );
}

export default MoviesCardList;

