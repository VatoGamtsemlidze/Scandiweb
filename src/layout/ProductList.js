import React, {Component} from 'react';
import './ProductListStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

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
        return (
            <div style={{display:"flex",justifyContent:"center"}}>
            <div className="product-list">
                {this.data.map((el, index) => {
                    return(
                        <div className="card" key={index}>
                            <img style={{maxWidth:"100%"}} src={el.image} alt=""/>
                            <h3>{el.title}</h3>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <h3 style={{fontWeight:400}}>${el.price}</h3>
                                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                            </div>
                        </div>
                    )
                })}
            </div>
                </div>
        );
    }
}

export default ProductList;