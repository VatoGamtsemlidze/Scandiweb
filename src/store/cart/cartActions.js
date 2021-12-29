import {ADD_ITEM, CHANGE_ATTRIBUTE, REMOVE_ITEM} from "./cartConsts";

export const addItemAction = (item) => {
    return{
        type: ADD_ITEM,
        item
    }
}
export const removeItemAction = (id) => {
    return{
        type: REMOVE_ITEM,
        id
    }
}
export const changeAttributeAction = (itemID, attributeName, attributeID) => {
    return {
        type: CHANGE_ATTRIBUTE,
        itemID,
        attributeName,
        attributeID
    }
}