import {createStore} from 'redux';
import combineReducers from "./combineReducers";
import {persistStore} from "redux-persist";


export const store = createStore(
    combineReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const persistor = persistStore(store)

