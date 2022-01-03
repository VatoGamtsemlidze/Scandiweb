import React, {Component} from 'react';
import './ProductListStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {addItemAction, removeItemAction} from "../../store/cart/cartActions";
import {connect} from "react-redux";
import {client} from "../../index";
import {gql} from "@apollo/client";
import {Link} from "react-router-dom";
import {productPagePath} from '../../components/routes'
import {Toast} from "../../components/Toast";
import {currencyAmountTracker} from "../../components/utils";

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.currencyAmountTracker = currencyAmountTracker.bind(this)
    }


    getImage() {
        const category = this.props.category.category

        client.query({
            query: gql`
                query{
                  category(input: {title: "${category}"}){
                    products{
                      id
                      name
                      gallery
                      attributes{
                        id
                        name
                        type
                        items{
                          displayValue
                          value
                          id
                        }
                      }
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
                            <div className="card"  key={product.name}>
                                <Link to={productPagePath.replace(':id', product.id)} style={{display:"flex"}}>
                                    <img style={{maxWidth:"100%"}} src={product.gallery[0]} alt=""/>
                                </Link>
                                <div>
                                    <Link to={productPagePath.replace(':id', product.id)} style={{display:"flex"}}>
                                        <h3 style={{fontSize:"25px"}}>{product.name}</h3>
                                    </Link>
                                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                        <h3 style={{fontWeight:400, fontSize:"22px"}}>
                                            {currency}
                                            {currencyAmountTracker(currency,product)}
                                        </h3>
                                        <FontAwesomeIcon onClick={() => {
                                            this.setState({showToast: true})
                                            this.props.addItemAction(product)
                                        }} icon={faShoppingCart} className="cart-icon"/>
                                    </div>
                                </div>
                            </div>
                    )
                })}
            </div>
                {this.state?.showToast ?
                    <div style={{position: "fixed", top: "2%", left: "44%"}}>
                        <Toast toastOff={() => this.setState({showToast: false})} text="Item has been successfully added to cart"/>
                    </div>
                    :
                    null}
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