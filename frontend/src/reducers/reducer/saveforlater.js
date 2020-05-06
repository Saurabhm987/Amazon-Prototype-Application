// import {
//     ADD_SAVEFORLATER, DELETE_SAVEFORLATER, FETCH_SAVEFORLATER, MOVE_TOCART,
//      ADD_TO_CART_PRODUCT_DETAIL_PAGE
// }
//     from "../../actions/types";
// const _ = require('lodash');

// const initialState = {

//     saveforlater: [],
//     cartlist: [],
//     cartsubtotal: 0,
//     carttotalitems: 0,
//     checkoutdetails: {},
//     checkoutsubtotal: 0,
//     checkouttotalitems: 0,
//     ordersummary: 0
// };

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case ADD_SAVEFORLATER:
//             return {
//                 ...state,
//                 saveforlater: action.payload,
//                 redirectToSaveForLater: true
//             };

//         case DELETE_SAVEFORLATER:
//             return {
//                 ...state,
//                 saveforlater: action.payload
//             };
//         case FETCH_SAVEFORLATER:
//             return {
//                 ...state,
//                 saveforlater: action.payload,
//                 redirectToSaveForLater: false
//             };
//         case MOVE_TOCART:
//             return {
//                 ...state,
//                 cartlist: action.payload
//             };
//         case ADD_TO_CART_PRODUCT_DETAIL_PAGE:
//             return {
//                 cartRedirect: true
//             };
//         // case MOVE_TOCART:
//         //     return {
//         //         ...state,
//         //         saveforlater: action.payload,
//         //         cartlist: action.payload
//         //     };
//         case CUSTOMER_CART:
//             console.log(action.payload)
//             let subtotal = _.sumBy(action.payload, function (item) { 
//                 console.log(item)
//                 if (item.gift) 
//                 { 
//                     return (((item.productId.price * (105/100)).toFixed(2)) * item.quantity) 
//                 } 
//                 else { 
//                     return (item.productId.price * item.quantity) 
//                 } 
//             })
//             console.log(subtotal)
//             return Object.assign({}, state, {
//                 cartlist: action.payload,
//                 cartsubtotal: subtotal.toFixed(2),
//                 carttotalitems: _.sumBy(action.payload, 'quantity'),
//                 cartRedirect: false  
//             });
       
//         default:
//             return state;
//     }
// };
