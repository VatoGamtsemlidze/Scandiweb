import {CHANGE_CURRENCY} from "./currencyConsts";

const initialState = {
    currency: "$"
}

export const currencyReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_CURRENCY:
            return{
                currency: action.currency
            }
        default:
            return state;
    }
}