import React, {Component} from 'react';
import './TopbarStyle.css'
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faEuroSign, faShoppingCart, faYenSign} from "@fortawesome/free-solid-svg-icons";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {changeCurrencyAction} from "../../store/currency/currencyActions";
import {changeCategoryAction} from "../../store/category/categoryActions";
import logo from '../../assets/a-logo.png'

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

        const currency = this.props.currency.currency;

        return (
            <div className="topbar">
                <div>
                    <ul>
                        <li onClick={() => this.props.changeCategoryAction("all")}>All</li>
                        <li onClick={() => this.props.changeCategoryAction("tech")}>Tech</li>
                        <li onClick={() => this.props.changeCategoryAction("clothes")}>Clothes</li>
                    </ul>
                </div>
                <div>
                    <img style={{width:"50px"}} src={logo} alt=""/>
                </div>
                <div className="icons">
                    <div>
                        <div className="dropdown">
                        <FontAwesomeIcon icon={currency==="$" ? faDollarSign : currency==="£" ? faEuroSign : faYenSign}/>
                            <FontAwesomeIcon icon={faCaretDown} onClick={() => this.setState({dropdown: !this.state.dropdown})} className="dropbtn"/>
                            <div ref={this.wrapperRef} className="dropdown-currency" style={{display: this.state.dropdown ? "flex" : "none"}}>
                                <span onClick={() => {
                                    this.props.changeCurrencyAction("$")
                                    this.setState({dropdown: false})}}>$ USD</span>
                                <span onClick={() => {
                                    this.props.changeCurrencyAction("£")
                                    this.setState({dropdown: false})}}>£ GBP</span>
                                <span onClick={() => {
                                    this.props.changeCurrencyAction("¥")
                                    this.setState({dropdown: false})}}>¥ JPY</span>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                        <span style={{background:"black",color:"white",padding:"1px 5px", fontSize:"12px",borderRadius:"100%",position:"absolute",marginLeft:"-3px"}}>{this.props.cartReducer.cart.length}</span>
                    </div>
                </div>
            </div>
    );
    }
}
const mapStateToProps = (state) => {
    return{
        cartReducer: state.cartReducer,
        currency: state.currencyReducer,
        category: state.categoryReducer,
    }
}
const mapDispatchToProps = () => {
    return{
        changeCurrencyAction,
        changeCategoryAction
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(Topbar);