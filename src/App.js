import React, {Component} from 'react';
import Topbar from "./layout/Topbar/Topbar";
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import {productsPagePath, productPagePath, cartPagePath} from "./components/routes";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";


class App extends Component {

    render() {
        return (
            <Router>
                <Topbar/>
                <Switch>
                    <Route exact path={productsPagePath} component={CategoryPage}/>
                    <Route path={productPagePath} component={ProductPage}/>
                    <Route path={cartPagePath} component={CartPage}/>
                </Switch>
            </Router>
        )
    }
}
export default App;