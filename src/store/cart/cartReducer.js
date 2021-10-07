import {ADD_ITEM, REMOVE_ITEM} from "./cartConsts";

const initialStore = {
    cart: []
}

export const cartReducer = (store = initialStore, action) => {
    switch(action.type){
        case ADD_ITEM:
            return {
                ...store,
                cart: [...store.cart, action.item]
            }
        case REMOVE_ITEM:
            return {
                ...store,
                cart: store.cart.filter(
                    (item) => item.id !== action.index,
                ),
            }
        default:
            return store
    }
}