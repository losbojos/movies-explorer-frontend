import React from 'react';
import './navtab.css';

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