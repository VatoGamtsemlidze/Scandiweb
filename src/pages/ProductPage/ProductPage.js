import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './ProductPageStyle.css';
import {connect} from "react-redux";
import {addItemAction, removeItemAction} from "../../store/cart/cartActions";
import {client} from "../../index";
import {gql} from "@apollo/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Toast} from "../../components/Toast";
import {currencyAmountTracker} from "../../components/utils";

class ProductPage extends Component {

    constructor() {
        super();
        this.currencyAmountTracker = currencyAmountTracker.bind(this)
    }

    state = {
        attributes: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getSingleProduct(id)
    }

    getSingleProduct(id) {
        client.query({
            query : gql`
            query {
                product(id: "${id}") {
                  id
                  name
                  inStock
                  brand
                  gallery
                  description
                  attributes {
                    name
                    id
                    type
                    items {
                      id
                      value
                      displayValue
                    }
                  }
                  prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                  }
                }
            }`
        }).then((res) => {
            this.setState({
                product: res?.data?.product,
                mainImage: res?.data?.product.gallery[0]
            })
        })
    }

    generateNewProduct() {
        const newProduct = {...this.state.product, checkedAttributes: this.state.attributes}
        this.props.addItemAction(newProduct)
    }

    render() {
        const currency = this.props.currency.currency;
        const product = this.state?.product;
        const images = [];
        const description = product?.description.replace(new RegExp('<[^>]*>', 'g'), '');
        const res = description?.slice(0,250);
        let mainImage = this.state?.mainImage;
        for(let i=0;i<4;i++){
            images.push(<img key={i} onClick={() => this.setState({mainImage: product?.gallery[i]})} src={product?.gallery[i]} alt=""/>)
        }
        return(
            <div className="parent-cont">
                <div className="product-page-grid">
                    <div className="product-pictures">
                        <div className="more-pics">
                            {images}
                        </div>
                        <div className="main-pic">
                            <img src={mainImage} alt=""/>
                        </div>
                    </div>
                    <div className="product-description">
                        <div>
                            <h1 style={{width: "70%",fontWeight:"600"}}>{product?.name.split(" ",1)}<span></span></h1>
                            <h1 style={{width: "70%",fontWeight:"400",marginTop:"-15px"}}>{product?.name.substr(product?.name.indexOf(" ") +1)}<span></span></h1>
                        </div>
                        <div>
                            {product?.attributes.map(attribute => {
                                return (
                                    <ul key={attribute.id} style={{display: "flex", flexDirection:"column"}}>
                                        <h4>{attribute.name}</h4>
                                        <div style={{display:"flex",flexWrap:"wrap"}}>
                                            {attribute.items.map(item => {
                                                const stateAttributes = this.state.attributes;
                                                const attributesToAdd = {name: attribute.name, id: item.id};
                                                const checked = stateAttributes.find(att => att.name === attribute.name)
                                                return(
                                                    <li
                                                        onClick={() => {
                                                            const item = stateAttributes.find(att => att.name === attribute.name)
                                                            const itemIndex = stateAttributes.indexOf(item)
                                                            item ? stateAttributes.splice(itemIndex, 1, attributesToAdd) : stateAttributes.push(attributesToAdd);

                                                            this.setState({attributes: stateAttributes})
                                                        }}
                                                        key={item.id}
                                                        style={attribute.name === "Color" ? {backgroundColor:item.value} : checked?.id === item.id ? {backgroundColor:  "black", color:"white"} : {backgroundColor:"white", color:"black"}}
                                                    >
                                                        {attribute.name !== "Color" ?  item.value : checked?.id === item.id ? <FontAwesomeIcon
                                                                color={item.value !== "#FFFFFF" ? "white" : "black"}
                                                                icon={faCheck}/>
                                                            : <span>&nbsp;</span>}
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    </ul>
                                )
                            })}
                        </div>
                        <div style={{paddingTop:"20px"}}>
                            <label><strong>Price: </strong></label>
                                <h2>
                                    {currency}
                                    {currencyAmountTracker(currency, product)}
                                </h2>
                        </div>
                        <div>
                            <button className="add-to-cart-btn"onClick={() => {
                                this.generateNewProduct();
                                this.setState({showToast: true})
                                }}>Add To Cart</button>
                        </div>
                        <div className="product-paragraph">
                            {description?.length >= 250 && !this.state?.showFullDesc ?
                                <p>{res}<span onClick={() => this.setState({showFullDesc: true})}>...more</span></p>
                                :
                                <p>{description} {this.state?.showFullDesc ? <span onClick={() => this.setState({showFullDesc: false})}>...less</span> : null}</p>}
                        </div>
                    </div>
                </div>
                {this.state?.showToast ?
                    <div style={{position: "absolute", top: "2%", left: "44%"}}>
                        <Toast toastOff={() => this.setState({showToast: false})} text="Item has been successfully added to cart"/>
                    </div> : null}
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
        removeItemAction,

    }
}
export default connect(mapStateToProps,mapDispatchToProps()) (withRouter(ProductPage));