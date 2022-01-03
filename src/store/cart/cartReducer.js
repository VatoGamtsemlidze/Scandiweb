import {ADD_ITEM, CHANGE_ATTRIBUTE, REMOVE_ITEM} from "./cartConsts";

const initialStore = {
    cart: [],
    cartLength: 0,
}
export const cartReducer = (store = initialStore, action) => {
    switch(action.type){
        case ADD_ITEM:
            const item = store.cart.find(item => item.item.id === action.item.id);
            const products = store.cart.map(item => {
                if(item.item.id === action.item.id){
                    return {...item, quantity: item.quantity + 1}
                }
                return item;
            })
            const itemToInsert = {
                item: action.item,
                quantity: 1,
                checkedAttributes: action.item.checkedAttributes
            }
            return item ? {
                ...store,
                cart: products,
                cartLength: store.cartLength+1
            } : {
                ...store,
                cart: [...store.cart, itemToInsert],
                cartLength: store.cartLength+1
            }
        case REMOVE_ITEM:
            const findItem = store.cart.find(item => item.item.id === action.id);
            const indexOfItem = store.cart.indexOf(findItem)
            const items = store.cart.filter(item => item.item.id !== action.id);
            findItem.quantity > 1 && items.splice(indexOfItem, 0,{item: findItem.item, quantity: findItem.quantity - 1})
            return {
                ...store,
                cart: items,
                cartLength: store.cartLength-1
            }
        case CHANGE_ATTRIBUTE:
            const attribute = {name: action.attributeName, id: action.attributeID};
            const cartItems = store.cart.map(item => {
                if(item.item.id === action.itemID){
                    switch (action.attributeName){
                        case "Color":
                            return {...item, colorAttribute: attribute};
                        case "Size":
                            return {...item, sizeAttribute: attribute};
                        case "Capacity":
                            return {...item, capacityAttribute: attribute};
                        case "With USB 3 ports":
                            return {...item, usbAttribute: attribute};
                        case "Touch ID in keyboard":
                            return {...item, touchIDAttribute: attribute};
                        default:
                            return alert("wrong attribute type")
                    }
                }
                return item;
            });
            return {
                ...store,
                cart: cartItems
            }
        default:
            return store
    }
}