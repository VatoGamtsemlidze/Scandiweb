import {CHANGE_CATEGORY} from "./categoryConsts";

export const changeCategoryAction = (category) => {
    return {
        type: CHANGE_CATEGORY,
        category
    }
}