import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import './searchmovies.css';

function SearchMovies(props) {

    const { handleSearch, onlyShortFilms = false } = props;

    const [shortFilmsChecked, setShortFilmsChecked] = useState(onlyShortFilms);

    const handleSearchString = (props) => { /* props содержит уже searchString */
        props.onlyShortFilms = shortFilmsChecked;
        handleSearch(props);
    }

    const handleCheckBoxChanged = (newValue) => {
        setShortFilmsChecked(newValue);
    }

    return (
        <section className='searchmovies'>
            <SearchForm searchPlaceholder='Фильм' handleSearch={handleSearchString} />
            <CustomCheckBox
                caption='Короткометражки'
                checked={shortFilmsChecked}
                onChanged={handleCheckBoxChanged}
            />
        </section>
    );

}

export default SearchMovies;