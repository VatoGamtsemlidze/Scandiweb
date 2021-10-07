import {combineReducers} from "redux";
import {cartReducer} from "./cart/cartReducer";
import {currencyReducer} from "./currency/currencyReducer";

export default combineReducers({
    cartReducer,
    currencyReducer
})