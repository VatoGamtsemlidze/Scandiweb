import {ADD_ITEM,REMOVE_ITEM} from "./cartConsts";

export const addItemAction = (item) => {
    return{
        type: ADD_ITEM,
        item
    }
}
export const removeItemAction = (index) => {
    return{
        type: REMOVE_ITEM,
        index
    }
}