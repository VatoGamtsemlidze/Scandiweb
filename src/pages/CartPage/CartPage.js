import React, {Component} from 'react';
import {connect} from "react-redux";
import {removeItemAction,addItemAction,changeAttributeAction} from "../../store/cart/cartActions";
import './CartPageStyle.css';
import {productPagePath} from "../../components/routes";
import {Link} from "react-router-dom";
import {attributeToPassFinder, currencyAmountTracker, renderAttributeList} from "../../components/utils";
import {Toast} from "../../components/Toast";

class CartPage extends Component {
    constructor() {
        super();
        this.renderAttributeList = renderAttributeList.bind(this)
        this.currencyAmountTracker = currencyAmountTracker.bind(this)
        this.attributeToPassFinder = attributeToPassFinder.bind(this)
    }
    render() {
        const cart = this.props.cartReducer.cart;
        const currency = this.props.currency.currency;
        let total = 0;
        return (
            <div className="parent-container">
                <div className="cart-title">
                    <h1>Cart</h1>
                </div>
                {cart.length === 0 ? <h1 style={{textAlign:"center",color:"#c3c3c3", fontWeight:"lighter",marginTop:"200px"}}>Cart is empty</h1>
                    :
                    <div>
                        {cart?.map(({
                                   item,
                                   quantity,
                                   sizeAttribute,
                                   colorAttribute,
                                   capacityAttribute,
                                   usbAttribute,
                                   touchIDAttribute}) => {
                        total += currencyAmountTracker(currency, item)*quantity;
                        return(
                            <>
                            <div key={item.name} className="cart-item">
                                <div className="cart-item-desc">
                                    <Link to={productPagePath.replace(':id', item.id)} style={{textDecoration:"none", color:"black"}}>
                                        <h1 style={{fontWeight:"600"}}>{item.name.split(" ",1)}<span></span></h1>
                                        <h1 style={{fontWeight:"400",}}>{item.name.substr(item.name.indexOf(" ") +1)}<span></span></h1>
                                    </Link>
                                    <h1 style={{fontSize:"25px"}}>
                                        {currency}
                                        {currencyAmountTracker(currency, item)}
                                    </h1>
                                    {item?.attributes?.map((attribute) => {
                                        return(
                                            <ul key={attribute.id}>
                                                <div className="attribute-size">
                                                    <h4>{attribute.name}</h4>
                                                    <div>
                                                        {attribute.items.map((att) => {
                                                            const attributeArray = [sizeAttribute, colorAttribute, capacityAttribute, usbAttribute, touchIDAttribute];
                                                            const attributeToPass = attributeToPassFinder(attributeArray, attribute)
                                                            const matchAttName = attributeArray.find(att => att?.name === attribute.name)
                                                            const attToPass = item?.checkedAttributes?.find(att => att.name === attribute.name);
                                                            return (this.renderAttributeList(item.id, attribute.name, att, attToPass && !matchAttName ? attToPass : attributeToPass, attribute.id))
                                                        })}
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
                            </>
                        )
                        })}
                        <div style={{display:"flex", justifyContent:"space-between",padding:"30px"}}>
                            <h2 style={{fontWeight:"500",margin:"0px"}}>Total: {currency}{total.toFixed(2)}</h2>
                            <button style={{padding:"12px 35px",cursor:"pointer",fontSize:"15px", border:"none", borderRadius:"5px", background:"#5ECE7B", color:"white"}} onClick={()=>this.setState({showToast:true})}>Pay</button>
                        </div>
                        {this.state?.showToast ?
                            <div style={{position: "fixed", top: "2%", left: "44%"}}>
                                <Toast toastOff={() => this.setState({showToast: false})} text="Transaction has been made successfully!"/>
                            </div>
                            :
                            null}
                    </div>
                }
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