import React, {Component} from "react";
import {
    CartOverlayItemStyled,
    CheckoutButtonStyled,
    ModalBackgroundStyled,
    ModalStyled,
    ViewBagButtonStyled
} from "./OverlayStyles";
import {cartPagePath} from "./routes";
import {Link} from "react-router-dom";
import {addItemAction, changeAttributeAction, removeItemAction} from "../store/cart/cartActions";
import {connect} from "react-redux";
import {renderAttributeList} from "./utils";

class Overlay extends Component{

    constructor() {
        super();
        this.renderAttributeList = renderAttributeList.bind(this)
    }

    render() {
        const cart = this.props.cartReducer.cart;
        const currency = this.props.currency.currency;
        let total = 0;
        return (
            <>
                <ModalBackgroundStyled onClick={this.props.onCloseRequest}/>
                <ModalStyled>
                    <div style={{padding: "5px"}}>
                        <div style={{display: "flex"}}>
                            <h4 style={{margin: "0", fontWeight: "500"}}>My Bag,</h4>
                            <span>&nbsp;{cart.length} item{cart.length > 1 ? "s" : null}</span>
                        </div>
                        <div style={{padding: 0}}>
                            {cart.map(({
                                           item,
                                           quantity,
                                           sizeAttribute,
                                           colorAttribute,
                                           capacityAttribute,
                                           usbAttribute,
                                           touchIDAttribute
                                       }) => {
                                total += currency === "$" ? item.prices[0]?.amount * quantity : currency === "£" ? item.prices[1]?.amount * quantity : item.prices[3]?.amount * quantity
                                return (
                                    <CartOverlayItemStyled key={item.id} style={{padding: "15px 0px"}}>
                                        <div className="description">
                                            <h4>{item.name}</h4>
                                            <h1>
                                                {currency}
                                                {currency === "$" ? item.prices[0]?.amount : currency === "£" ? item.prices[1]?.amount : item.prices[3]?.amount}
                                            </h1>
                                            {item.attributes.map((attribute) => {
                                                return (
                                                    <ul key={attribute.id}>
                                                        <div className="attribute-size">
                                                            <h4>{attribute.name}</h4>
                                                            <div>
                                                                {attribute.items.map((att) => {
                                                                    //@Todo Should refactor this also (MAKE IT IN UTILS)
                                                                    const attributeArray = [sizeAttribute, colorAttribute, capacityAttribute, usbAttribute, touchIDAttribute];
                                                                    const attributeToPass = attributeArray.map((attr => {
                                                                        return typeof attr !== undefined && attr?.name === attribute.id ? attr : null
                                                                    })).find(attr => attr !== null)
                                                                    return (this.renderAttributeList(item.id, attribute.name, att, attributeToPass, attribute.id))
                                                                })}
                                                            </div>
                                                        </div>
                                                    </ul>
                                                )
                                            })}
                                        </div>
                                        <div className="count-and-image">
                                            <ul>
                                                <li onClick={() => this.props.addItemAction(item)}>+</li>
                                                <span style={{
                                                    textAlign: "center",
                                                    fontSize: "20px",
                                                    fontWeight: "500"
                                                }}>{quantity}</span>
                                                <li onClick={() => this.props.removeItemAction(item.id)}>-</li>
                                            </ul>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src={item.gallery[0]} alt=""/>
                                            </div>
                                        </div>
                                    </CartOverlayItemStyled>
                                )
                            })}
                        </div>
                        {cart.length > 0 ?
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h4>Total</h4>
                                <h4>{total.toFixed(2)} {currency}</h4>
                            </div>
                            :
                            <div style={{margin: "30px 0px", color: "gray", fontWeight: "300"}}>
                                Cart is empty
                            </div>
                        }
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Link to={cartPagePath} onClick={this.props.onCloseRequest}>
                                <ViewBagButtonStyled disabled={cart.length <= 0}>View Bag</ViewBagButtonStyled>
                            </Link>
                            <Link to={cartPagePath} onClick={this.props.onCloseRequest}>
                                <CheckoutButtonStyled disabled={cart.length <= 0}>
                                    Check out
                                </CheckoutButtonStyled>
                            </Link>
                        </div>
                    </div>
                </ModalStyled>
            </>
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
        changeAttributeAction
    }
}
export default  connect(mapStateToProps, mapDispatchToProps())(Overlay)
