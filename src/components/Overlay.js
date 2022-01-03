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
import {attributeToPassFinder, currencyAmountTracker, renderAttributeList} from "./utils";
import {connect} from "react-redux";

class Overlay extends Component{

    constructor() {
        super();
        this.renderAttributeList = renderAttributeList.bind(this)
        this.attributeToPassFinder = attributeToPassFinder.bind(this)
        this.currencyAmountTracker = currencyAmountTracker.bind(this)
    }

    state = {
        bool: true
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
                        <div style={{display: "flex", margin:"5px 0px"}}>
                            <h4 style={{margin: "0", fontWeight: "500"}}>My Bag,</h4>
                            <span>&nbsp;{cart.length} item{cart.length > 1 ? "s" : null}</span>
                        </div>
                        <div className="item-list" style={{padding: 0, overflowY: "scroll", height: cart.length > 1 ? "500px" : null}}>
                            {cart.map(({
                                           item,
                                           quantity,
                                           sizeAttribute,
                                           colorAttribute,
                                           capacityAttribute,
                                           usbAttribute,
                                           touchIDAttribute
                                       }) => {
                                total += currencyAmountTracker(currency, item)*quantity;
                                return (
                                    <CartOverlayItemStyled key={item.id} style={{padding: "15px 0px"}}>
                                        <div className="description">
                                            <h4>{item.name}</h4>
                                            <h1>
                                                {currency}
                                                {currencyAmountTracker(currency, item)}
                                            </h1>
                                            {item.attributes.map((attribute) => {
                                                return (
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
