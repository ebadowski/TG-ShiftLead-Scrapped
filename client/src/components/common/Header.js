import React from 'react';
import logo from '../../utils/images/TGLogo.png';
import "./style.css";

const imageFix = {
    height: "55px",
    paddingTop: "2px"
};

function Header(props) {
    console.log(props)
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo center"><img src={logo} alt="Logo" className="brand-logo center" style={imageFix} /></a>
                <ul id="nav-mobile" className="right hide-on-small-only">
                    <li><a href="sass.html">FloorPlan</a></li>
                    <li><a href="badges.html">ShiftLead</a></li>
                    <li><a href="collapsible.html">Admin</a></li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-up">
                    <li><a href="sass.html">FP</a></li>
                    <li><a href="badges.html">SL</a></li>
                    <li><a href="collapsible.html">ADMN</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;