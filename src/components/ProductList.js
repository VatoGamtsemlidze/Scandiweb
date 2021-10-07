import React, {Component} from 'react';
import './ProductList.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

class ProductList extends Component {


    render() {
        return (
            <div style={{display:"flex"}}>
                <div className="product-list">
                {this.props.data.map((el, index) => {
                    return(
                        <div key={index} style={{paddingTop:"10px"}} >
                            <div className="card">
                        <img src={el.image} alt=""/>
                            <div style={{width:"100%",textAlign:"left"}}>
                                <h4 className="product-title">{el.title}</h4>
                                <h3 className="product-price" >${el.price}</h3>
                            </div>
                                <div style={{textAlign:"right"}}>
                                        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                                </div>
                            </div>
                    </div>)
                })}
                </div>
            </div>
        );
    }
}

export default ProductList;