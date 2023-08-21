import React from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import './searchform.css';

function SearchForm({ searchPlaceholder, buttonSubmitText = 'Поиск', handleSearch }) {

    const { values, handleChange, errors, isValid } = useFormAndValidation({}, false);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch({ searchString: values[searchStringInput] });
    }

    const searchStringInput = 'searchString';

    return (
        <form className='searchform' onSubmit={handleSubmit} noValidate>
            <input
                className='searchform__input'
                type="text"
                required
                placeholder={searchPlaceholder}
                name={searchStringInput}
                value={values[searchStringInput] || ''}
                onChange={handleChange}
            />
            <button
                className="searchform__submit"
                disabled={!isValid}
                type="submit"
            >
                {buttonSubmitText}
            </button>
        </form >
    );

}

export default SearchForm;