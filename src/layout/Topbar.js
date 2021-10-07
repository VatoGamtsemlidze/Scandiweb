import React, {Component} from 'react';
import './Topbar.css';

class Topbar extends Component {
    render() {
        return (
            <div className="main-cont">
                <div className="category-list">
                    <ul>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Kids</li>
                    </ul>
                </div>
                <div className="logo-cont">
                    Logo
                </div>
                <div className="icons-cont">
                    $ & cart
                </div>
            </div>
        );
    }
}

export default Topbar;