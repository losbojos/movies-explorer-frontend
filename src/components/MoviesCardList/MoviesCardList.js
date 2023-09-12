import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './movies-card-list.css';
import './movies-card-list__list-item.css';

function getWindowWidth() {
    return window.innerWidth;
}

function calculateInitialNumber(forWidth) {
    if (forWidth < 768) {
        return 5;
    } else if (forWidth < 1280) {
        return 8;
    } else {
        return 12;
    }
}

function calculateAddingNumber(forWidth) {
    if (forWidth < 1280) {
        return 2;
    } else {
        return 3;
    }
}

function MoviesCardList(props) {

    const {
        movies,
        onlyLikedView,
        handleToggleLike,
        pageCount,
        setAllCardsDisplayed
    } = props;

    const timerId = useRef(null);
    const [screenWidth, setScreenWidth] = useState(getWindowWidth());
    const [initialCardsNumber, setInitialCardsNumber] = useState(calculateInitialNumber(screenWidth));
    const [addingCardsNumber, setAddingCardsNumber] = useState(calculateAddingNumber(screenWidth));

    const handleWindowResize = () => {

        if (onlyLikedView) return;

        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
        }

        timerId.current = setTimeout(() => {
            setScreenWidth(getWindowWidth());
        }, 500);
    }

    useEffect(() => {

        if (onlyLikedView) return;

        window.addEventListener('resize', handleWindowResize);

        return (() => {
            window.removeEventListener('resize', handleWindowResize);
        });
    }, []);

    useEffect(() => {
        setInitialCardsNumber(calculateInitialNumber(screenWidth));
        setAddingCardsNumber(calculateAddingNumber(screenWidth));
    }, [screenWidth]);

    useEffect(() => {
        setAllCardsDisplayed(initialCardsNumber + pageCount * addingCardsNumber >= movies.length);
    }, [initialCardsNumber, addingCardsNumber, pageCount, movies]);

    return (
        <ul className="movies-card-list">
            {
                movies.slice(0, onlyLikedView ? -1 : initialCardsNumber + pageCount * addingCardsNumber).map(movie => {
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

