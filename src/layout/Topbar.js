import React, {Component} from 'react';
import './TopbarStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";

class Topbar extends Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                dropdown: false
            })
        }
    }
    state =  {
        dropdown: false,
    }
    render() {

        return (
            <div className="topbar">
                <div>
                    <ul>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Kids</li>
                    </ul>
                </div>
                <div>
                    logo
                </div>
                <div className="icons">
                    <div>
                        <div className="dropdown">
                        <FontAwesomeIcon icon={faDollarSign}/>
                            <FontAwesomeIcon icon={faCaretDown} onClick={() => this.setState({dropdown: !this.state.dropdown})} className="dropbtn"/>
                            <div ref={this.wrapperRef} className="dropdown-currency" style={{display: this.state.dropdown ? "flex" : "none"}}>
                                <span onClick={() => this.setState({dropdown: false})}>$ USD</span>
                                <span onClick={() => this.setState({dropdown: false})}>€ EUR</span>
                                <span onClick={() => this.setState({dropdown: false})}>¥ JPY</span>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </div>
                </div>
            </div>
    );
    }
}

export default Topbar;