import React from 'react';

import './navtab.css';
import './navtab__line.css';
import './navtab__link.css';
import './navtab__text.css';
import './navtab__pointer.css';

function Navtab(props) {
    const { title, link, showline = true } = props;

    return (
        <div className="navtab">
            {showline &&
                (
                    <hr className="navtab__line"></hr>
                )
            }
            <a className="navtab__link" href={link} target="_blank">
                <p className="navtab__text">{title}</p>
                <p className="navtab__pointer">↗</p>
            </a>
        </div>
    );
}

export default Navtab;