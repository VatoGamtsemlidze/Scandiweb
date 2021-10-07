import {ADD_PRODUCT, REMOVE_PRODUCT} from "./productConsts";

export const addProductAction = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    }
}
export const removeProductAction = (index) => {
    return {
        type: REMOVE_PRODUCT,
        index
    }
}