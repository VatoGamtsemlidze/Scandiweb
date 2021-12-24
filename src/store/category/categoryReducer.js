import {CHANGE_CATEGORY} from "./categoryConsts";

const initialState = {
    category: "all"
}
export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return{
                category: action.category
            }
        default :
            return state;
    }
}