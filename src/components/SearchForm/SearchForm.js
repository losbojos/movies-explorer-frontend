import React, { useEffect } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';

import './search-form.css';
import './search-form__input.css';
import './search-form__submit.css';

function SearchForm({ searchPlaceholder, buttonSubmitText = 'Поиск', handleSearch, onSearchStringChanged = null }) {

    const searchStringInput = 'searchString';

    const { values, handleChange, errors, isValid } = useFormAndValidation({}, false);

    useEffect(() => {
        if (onSearchStringChanged !== null) {
            onSearchStringChanged(values[searchStringInput]);
        }
    }, [values]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch({ searchString: values[searchStringInput] });
    }

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