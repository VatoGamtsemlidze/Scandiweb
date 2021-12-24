import React, {Component} from 'react';
import './ProductListStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {addItemAction, removeItemAction} from "../../store/cart/cartActions";
import {connect} from "react-redux";
import {client} from "../../index";
import {gql} from "@apollo/client";

class ProductList extends Component {

    getImage() {
        console.log(this.props.category.category)
        const category = this.props.category.category
        console.log(category)

        client.query({
            query: gql`
                query{
                  category(input: {title: "${category}"}){
                    products{
                      name
                      gallery
                      description
                      prices{
                        currency{
                          label
                          symbol
                        }
                        amount
                      }
                    }
                  } 
                }
            `
        }).then((res) => {
            console.log(res)
            this.setState({
                products: res?.data?.category?.products
            })
        })
    }

    componentDidMount() {
        this.getImage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.category !== this.props.category){
            this.getImage()
        }
    }

    render() {
        const currency = this.props.currency.currency;

        return (
            <div style={{display:"flex",justifyContent:"center"}}>
            <div className="product-list">
                {this.state?.products?.map(product => {
                    return(
                        <div className="card" style={{maxWidth:"100%"}} key={product.name}>
                            <img style={{maxWidth:"100%"}} src={product.gallery[0]} alt=""/>
                            <div>
                                <h3 style={{fontSize:"25px"}}>{product.name}</h3>
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <h3 style={{fontWeight:400, fontSize:"22px"}}>
                                        {currency == "$" ? product.prices[0].currency.symbol : currency == "£" ? product.prices[1].currency.symbol : product.prices[3].currency.symbol }
                                        {currency == "$" ? product.prices[0].amount : currency == "£" ? product.prices[1].amount : product.prices[3].amount}
                                    </h3>
                                    <FontAwesomeIcon onClick={() => this.props.addItemAction(product)} icon={faShoppingCart} className="cart-icon"/>
                                </div>
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
        currency: state.currencyReducer,
        category: state.categoryReducer
    }
}

const mapDispatchToProps = () => {
    return{
        addItemAction,
        removeItemAction
    }
}

export default connect(mapStateToProps,mapDispatchToProps())(ProductList);