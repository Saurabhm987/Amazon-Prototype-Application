import {
    LOAD_CATEGORY,
    ADD_PRODUCT,
    FETCH_PRODUCT,
    PRODUCT_DETAIL,
} from '../../actions/types';

const initialState = {
    categoryList: [],
    productList: [],
    productDetail:{},
    productCount:0,
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
        
        case FETCH_PRODUCT:
            return {
                ...state,
                productList: payload.Products,
                productCount: payload.Count,
            }

        case PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: payload
            }

        default:
            return state;
    }
}
