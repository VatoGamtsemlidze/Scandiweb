import React, {Component} from 'react';
import './ProductListStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {addItemAction, removeItemAction} from "../../store/cart/cartActions";
import {connect} from "react-redux";

class ProductList extends Component {

    data = [
        {
            image: "https://picsum.photos/380",
            title: "Apollo Running Short",
            price: 50
        },
        {
            image: "https://picsum.photos/380",
            title: "Apollo Running Short",
            price: 50
        },
        {
            image: "https://picsum.photos/380",
            title: "Apollo Running Short",
            price: 50
        },
        {
            image: "https://picsum.photos/380",
            title: "Apollo Running Short",
            price: 50
        },
        {
            image: "https://picsum.photos/380",
            title: "Apollo Running Short",
            price: 50
        },
        {
            image: "https://picsum.photos/380",
            title: "Apollo Running Short",
            price: 50
        },


    ]

    render() {

        const currency = this.props.currency.currency

        return (
            <div style={{display:"flex",justifyContent:"center"}}>
            <div className="product-list">
                {this.data.map((el, index) => {
                    return(
                        <div className="card" key={index}>
                            <img style={{maxWidth:"100%"}} src={el.image} alt=""/>
                            <h3>{el.title}</h3>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <h3 style={{fontWeight:400}}>{currency} {el.price}</h3>
                                <FontAwesomeIcon onClick={() => this.props.addItemAction(el)} icon={faShoppingCart} className="cart-icon"/>
                            </div>
                        </div>
                    )
                })}
            </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        cartReducer: state.cartReducer,
        currency: state.currencyReducer
    }
}

const mapDispatchToProps = () => {
    return{
        addItemAction,
        removeItemAction
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(ProductList);