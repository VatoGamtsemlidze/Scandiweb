import React, {Component} from 'react';
import {connect} from "react-redux";
import {removeItemAction,addItemAction,changeAttributeAction} from "../../store/cart/cartActions";
import './CartPageStyle.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {productPagePath} from "../../components/routes";
import {Link} from "react-router-dom";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {renderAttributeList} from "../../components/utils";

class CartPage extends Component {

    constructor() {
        super();
        this.renderAttributeList = renderAttributeList.bind(this)
    }

    render() {

        const cart = this.props.cartReducer.cart;
        console.log(cart)
        const currency = this.props.currency.currency;
        return (
            <div className="parent-container">
                <div className="cart-title">
                    <h1>Cart</h1>
                </div>
                {cart.length === 0 ? <h1 style={{textAlign:"center",color:"#c3c3c3", fontWeight:"lighter",marginTop:"200px"}}>Cart is empty</h1>
                    :
                    cart?.map(({item, quantity,attributeID}) => {
                        return(
                            <div key={item.name} className="cart-item">
                                <div className="cart-item-desc">
                                    <Link to={productPagePath.replace(':id', item.id)} style={{textDecoration:"none", color:"black"}}>
                                        <h1 style={{fontWeight:"600"}}>{item.name.split(" ",1)}<span></span></h1>
                                        <h1 style={{fontWeight:"400",}}>{item.name.substr(item.name.indexOf(" ") +1)}<span></span></h1>
                                    </Link>
                                    <h1 style={{fontSize:"25px"}}>
                                        {currency}
                                        {currency === "$" ? item.prices[0]?.amount : currency === "£" ? item.prices[1]?.amount : item.prices[3]?.amount}
                                    </h1>
                                    {item?.attributes?.map((attribute) => {
                                        console.log(attribute)
                                        return(
                                            <ul key={attribute.id}>
                                                    <div className="attribute-size">
                                                        <h4>{attribute.name}</h4>
                                                        <div>
                                                            {attribute.items.map((att) => (
                                                                attribute.id !== "Color" ?
                                                                        <li
                                                                            onClick={() => this.props.changeAttributeAction(item.id,attribute.name, att.id)}
                                                                            style={{background: att.id === attributeID ? "black" : "transparent", color: att.id === attributeID ? "white" : "black"}}
                                                                            key={att.id}
                                                                            >
                                                                            {att.value}
                                                                        </li>
                                                                        :
                                                                        <li
                                                                            onClick={() => {
                                                                                this.props.changeAttributeAction(item.id, attribute.name, att.id)
                                                                            }}
                                                                            style={{background: `${att.value}`, width:"5px", height:"5px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                                                            {att.id === attributeID ?
                                                                                <FontAwesomeIcon
                                                                                    color={att.value !== "#FFFFFF" ? "white" : "black"}
                                                                                    icon={faCheck}/>
                                                                                : null
                                                                            }
                                                                        </li>
                                                            ))}
                                                        </div>
                                                    </div>
                                            </ul>
                                        )
                                    })}
                                </div>
                                <div className="cart-item-image">
                                    <ul>
                                        <li onClick={() => this.props.addItemAction(item)}>+</li>
                                        <span style={{textAlign:"center", fontSize:"20px",fontWeight:"500"}}>{quantity}</span>
                                        <li onClick={() => this.props.removeItemAction(item.id)}>-</li>
                                    </ul>
                                    <div>
                                        <Link to={productPagePath.replace(':id', item.id)} style={{display:"flex"}}>
                                            <img src={item.gallery[0]} alt=""/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartReducer: state.cartReducer,
        currency: state.currencyReducer,
    }
}
const mapDispatchToProps = () => {
    return{
        removeItemAction,
        addItemAction,
        changeAttributeAction,
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(CartPage);