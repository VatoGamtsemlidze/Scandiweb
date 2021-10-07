import React, {Component} from 'react';
import CategoryTitle from "../components/CategoryTitle";
import ProductList from "../components/ProductList";

class Category extends Component {

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
            <div>
                <CategoryTitle category="Women"/>
                <ProductList data={this.data}/>
            </div>
        );
    }
}

export default Category;