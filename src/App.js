import React, {Component} from 'react';
import Topbar from "./layout/Topbar/Topbar";
import CategoryName from "./layout/CategoryName";
import './App.css'
import ProductList from "./layout/ProductList/ProductList";

class App extends Component {

    render() {
        return (
            <>
            <Topbar/>
                <div className="parent-cont">
                    <CategoryName category={"Women"}/>
                    <ProductList/>
                </div>
            </>
        )
    }
}
export default App;