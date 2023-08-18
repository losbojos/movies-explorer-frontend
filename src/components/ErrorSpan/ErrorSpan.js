import React from 'react';
import './error-span.css';
import './error-span_active.css';

function ErrorSpan({ errors }) {

    return (
        <span className={`error-span ${errors && 'error-span_active'}`}>
            {errors}
        </span>
    );
}

export default ErrorSpan;