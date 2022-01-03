import React, {Component} from 'react';
import './TopbarStyle.css'
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faShoppingCart, faYenSign, faPoundSign} from "@fortawesome/free-solid-svg-icons";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {changeCurrencyAction} from "../../store/currency/currencyActions";
import {changeCategoryAction} from "../../store/category/categoryActions";
import logo from '../../assets/a-logo.png'
import {Link} from "react-router-dom";
import {productsPagePath} from "../../components/routes";
import Overlay from "../../components/Overlay";

class Topbar extends Component {

    state = {
        showCartOverlay: false
    }

    toggleOverlay() {
        this.setState({showCartOverlay: !this.state.showCartOverlay});
    }

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
                <Link to={productsPagePath}>
                    <div>
                        <img style={{width:"50px"}} src={logo} alt=""/>
                    </div>
                </Link>
                <div className="icons">
                    <div>
                        <div className="dropdown" onClick={() => this.setState({dropdown: !this.state.dropdown})}>
                        <FontAwesomeIcon icon={currency==="$" ? faDollarSign : currency==="£" ? faPoundSign : faYenSign}/>
                            <FontAwesomeIcon icon={faCaretDown} className="dropbtn"/>
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
                    <div className="cart-icon" onClick={() => this.toggleOverlay()}>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span style={{background:"black",color:"white",padding:"1px 5px", fontSize:"12px",borderRadius:"100%",position:"absolute",marginLeft:"-3px"}}>{this.props.cartReducer.cart.length}</span>
                    </div>
                    {
                        this.state.showCartOverlay && <Overlay onCloseRequest={() => this.setState({showCartOverlay: false})}/>
                    }
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
        changeCategoryAction,
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Topbar);