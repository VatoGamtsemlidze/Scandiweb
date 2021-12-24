import {combineReducers} from "redux";
import {cartReducer} from "./cart/cartReducer";
import {currencyReducer} from "./currency/currencyReducer";
import {categoryReducer} from "./category/categoryReducer";

export default combineReducers({
    cartReducer,
    currencyReducer,
    categoryReducer,
})