import React from 'react';
import './landing-section.css';
import './landing-section-container.css';

function LandingSection({ outerSectionClass = null, innerSectionClass = null, id = null, children }) {

    const outerClasses = `landing-section ${outerSectionClass ? outerSectionClass : ''}`;
    const innerClasses = `landing-section-container ${innerSectionClass ? innerSectionClass : ''}`;

    return (

        <div className={outerClasses} >
            <section className={innerClasses} {...(id && { id })}>
                {children}
            </section>
        </div>
    );
}

export default LandingSection;