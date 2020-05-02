import {
    LOAD_CATEGORY,
    ADD_PRODUCT
} from '../../actions/types';
import { func } from 'prop-types';

const initialState = {
    categoryList: [],
    productList: [],
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOAD_CATEGORY:
            return {
                ...state,
                categoryList: payload
            };

        case ADD_PRODUCT:
            return {
                ...state,
                productList: payload
            }

        default:
            return state;
    }
}
