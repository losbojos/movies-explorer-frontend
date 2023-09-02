import React from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';

import './search-form.css';
import './search-form__input.css';
import './search-form__submit.css';

function SearchForm({ searchPlaceholder, buttonSubmitText = 'Поиск', handleSearch }) {

    const { values, handleChange, errors, isValid } = useFormAndValidation({}, false);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch({ searchString: values[searchStringInput] });
    }

    const searchStringInput = 'searchString';

    return (
        <form className='search-form' onSubmit={handleSubmit} noValidate>
            <input
                className='search-form__input'
                type="text"
                required
                placeholder={searchPlaceholder}
                name={searchStringInput}
                value={values[searchStringInput] || ''}
                onChange={handleChange}
            />
            <button
                className="search-form__submit"
                disabled={!isValid}
                type="submit"
            >
                {buttonSubmitText}
            </button>
        </form >
    );

}

export default SearchForm;