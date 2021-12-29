import React, {Component} from 'react';
import '../App.css'
import CategoryName from "../layout/CategoryName";
import ProductList from "../layout/ProductList/ProductList";

class CategoryPage extends Component {
    render() {
        return (
                <div className="parent-cont">
                    <CategoryName />
                    <ProductList/>
                </div>
        )
    }
}
export default CategoryPage;