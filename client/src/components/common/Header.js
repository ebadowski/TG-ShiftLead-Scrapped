import React from 'react';
import "./style.css";
function Header(props) {
    console.log(props)
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo center">Logo</a>
                <ul id="nav-mobile" className="right hide-on-small">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;