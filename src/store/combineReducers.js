import {combineReducers} from "redux";
import {cartReducer} from "./cart/cartReducer";
import {currencyReducer} from "./currency/currencyReducer";
import {categoryReducer} from "./category/categoryReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartReducer', 'currencyReducer', 'categoryReducer']
}

const rootReducer = combineReducers({
    cartReducer,
    currencyReducer,
    categoryReducer,
})

export default persistReducer(persistConfig, rootReducer)