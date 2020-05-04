import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER, FETCH_SAVEFORLATER, MOVE_TOCART,
    CUSTOMER_CART, ADD_TO_CART_PRODUCT_DETAIL_PAGE,CUSTOMER_CHECKOUT_DETAILS,
    CUSTOMER_CHECKOUT_SUBTOTAL, CUSTOMER_ORDER_SUMMARY
}
    from "../actions/types";
const _ = require('lodash');

const initialState = {

    saveforlater: [],
    cartlist: [],
    cartsubtotal: 0,
    carttotalitems: 0,
    checkoutdetails: {},
    checkoutsubtotal: 0,
    checkouttotalitems: 0,
    ordersummary: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload,
                redirectToSaveForLater: true
            };

        case DELETE_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload
            };
        case FETCH_SAVEFORLATER:
            return {
                ...state,
                saveforlater: action.payload,
                redirectToSaveForLater: false
            };
        case MOVE_TOCART:
            return {
                ...state,
                cartlist: action.payload
            };
        case ADD_TO_CART_PRODUCT_DETAIL_PAGE:
            return {
                cartRedirect: true
            };
        case MOVE_TOCART:
            return {
                ...state,
                saveforlater: action.payload,
                cartlist: action.payload
            };
        case CUSTOMER_CART:
            let subtotal = _.sumBy(action.payload, function (item) { if (item.gift) { return (((item.product.discountedPrice * (110/100)).toFixed(2)) * item.quantity) } else { return (item.product.discountedPrice * item.quantity) } })
            return Object.assign({}, state, {
                cartlist: action.payload,
                cartsubtotal: subtotal.toFixed(2),
                carttotalitems: _.sumBy(action.payload, 'quantity'),
                cartRedirect: false  
            });
        case CUSTOMER_CHECKOUT_DETAILS:
            return Object.assign({}, state, {
                checkoutdetails: action.payload
            });
        case CUSTOMER_CHECKOUT_SUBTOTAL:
            return Object.assign({}, state, {
                checkoutsubtotal: action.payload[0],
                checkouttotalitems: action.payload[1],
                checkoutdetails:action.payload[2]
            });
        case CUSTOMER_ORDER_SUMMARY:
            return Object.assign({}, state, {
                ordersummary: action.payload,
            });
        default:
            return state;
    }
};
