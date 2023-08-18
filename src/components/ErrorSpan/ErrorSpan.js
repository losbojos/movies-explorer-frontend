import React from 'react';
import './error-span.css';
import './error-span_active.css';

function ErrorSpan({ errors, addStyles }) {

    const classNames = `error-span ${errors && 'error-span_active'} ${addStyles && (addStyles)}`;
    return (
        <span className={classNames}>
            {errors}
        </span>
    );
}

export default ErrorSpan;