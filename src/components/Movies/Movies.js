import React, { Fragment, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchMovies from '../SearchMovies/SearchMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { errorHandler } from '../../utils/errorHandler.js';
import './movies.css';
import './movies__button.css';

function Movies(props) {

    const {
        movies, // Массив фильмов
        handleSearch, // Обработчик поиска с параметрами { searchString, onlyShortFilms } должен возвращать Promise
        likedMovies = false // Окно любимых фильмов
    } = props;

    const [isLoading, setIsLoading] = useState(false);

    const preprocessSearch = ({ searchString, onlyShortFilms }) => {
        setIsLoading(true);
        handleSearch({ searchString, onlyShortFilms })
            .then()
            .catch(error => errorHandler(error))
            .finally(() => setIsLoading(false));
    }

    const handleMore = () => {

    }

    return (
        <Fragment>
            <Header />
            <section className='movies'>
                <SearchMovies handleSearch={preprocessSearch} />
                {isLoading && (<Preloader />)}
                <MoviesCardList movies={movies} likedMovies={likedMovies} />
                <button
                    className='movies__button'
                    type='button'
                    aria-label='Показать больше фильмов'
                    disabled={likedMovies}
                    onClick='handleMore'
                >
                    Ещё
                </button>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Movies;