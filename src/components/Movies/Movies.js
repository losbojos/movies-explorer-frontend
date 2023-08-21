import React, { Fragment, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchMovies from '../SearchMovies/SearchMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import errorHandler from '../../utils/errorHandler';
import './movies.css';

function Movies(props) {

    const {
        movies, // Массив фильмов
        handleSearch // Обработчик поиска с параметрами { searchString, onlyShortFilms } должен возвращать Promise
    } = props;

    const [isLoading, setIsLoading] = useState(false);

    const preprocessSearch = ({ searchString, onlyShortFilms }) => {
        setIsLoading(true);
        handleSearch({ searchString, onlyShortFilms })
            .then()
            .catch(error => errorHandler(error))
            .finally(() => setIsLoading(false));
    }

    return (
        <Fragment>
            <Header />
            <section className='movies'>
                <SearchMovies handleSearch={preprocessSearch} />
                {isLoading && (<Preloader />)}
                <MoviesCardList movies={movies} />
            </section>
            <Footer />
        </Fragment>
    );
}

export default Movies;