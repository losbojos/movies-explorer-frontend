import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import './searchmovies.css';

function SearchMovies({ handleSearch }) {

    return (
        <section className='searchmovies'>
            <SearchForm searchPlaceholder='Фильм' handleSearch={handleSearch} />
            <CustomCheckBox caption='Короткометражки' />
        </section>
    );

}

export default SearchMovies;