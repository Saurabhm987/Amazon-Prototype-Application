import {
    LOAD_CATEGORY,
    ADD_PRODUCT,
    FETCH_PRODUCT,
    PRODUCT_DETAIL,
    FETCH_REVIEW,
    SETUP_ORDER_DETAIL_PRODUCT,
} from '../../actions/types';

const initialState = {
    categoryList: [],
    productList: [],
    reviews: [],
    productDetail:{},
    productCount:0,
    productListPerOrder:{}
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

        case FETCH_REVIEW:
            return{
                ...state,
                reviews : payload
            }


        case SETUP_ORDER_DETAIL_PRODUCT:
            return {
                ...state,
                productListPerOrder:payload
            }

        default:
            return state;
    }
}
