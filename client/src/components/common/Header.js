import React from 'react';
import logo from '../../utils/images/TGLogo.png';
import "./style.css";

import HdrSLLogin from './local-components/HDR-SLLogin'

const imageFix = {
    height: "55px",
    paddingTop: "2px"
};

function Header(props) {
    console.log(props)
    return (
        <nav>
            <div className="nav-wrapper">
                {/* <ul id="nav-mobile" className="left">
                <HdrSLLogin/>
                </ul> */}
                <ul id="nav-mobile" className="left">
                    <li>
                        <a
                            href="#"
                            onClick= {() => {sessionStorage.clear(); window.location.reload();}}
                            >
                        <i className="material-icons">exit_to_app</i>
                        </a>
                    </li>
                </ul>


                <a href="#" className="brand-logo center"><img src={logo} alt="Logo" className="brand-logo center" style={imageFix} /></a>

                <ul id="nav-mobile" className="right hide-on-small-only">
                    <li><a href="#">FloorPlan</a></li>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Admin</a></li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-up">
                    <li><a href="#">FP</a></li>
                    <li><a href="#">DB</a></li>
                    <li><a href="#">ADMN</a></li>
                </ul>
            </div>

        </nav>
    );
}

export default Header;