import {CHANGE_CURRENCY} from "./currencyConsts";

export const changeCurrencyAction = (currency) => {
    return{
        type: CHANGE_CURRENCY,
        currency
    }
}