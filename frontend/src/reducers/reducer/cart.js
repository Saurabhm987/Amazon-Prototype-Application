import {
    
    CUSTOMER_CART, CUSTOMER_SAVEFORLATER,
    CUSTOMER_SAVEFORLATER_DELETE,ADD_TO_CART_PRODUCT_DETAIL_PAGE
}
    from "../../actions/types";
const _ = require('lodash');

const initialState = {

    cartlist: [],
    cartsubtotal: 0,
    carttotalitems: 0,
    saveforlaterlist:[],
    
   
};

export default function (state = initialState, action) {
    switch (action.type) {
       
        case CUSTOMER_SAVEFORLATER_DELETE:
            console.log(action.payload)
            let subtota = _.sumBy(action.payload.cart, function (item) { 
                console.log(item)
                if (item.gift) 
                { 
                    return (((item.productId.price * (105/100)).toFixed(2)) * item.quantity) 
                } 
                else { 
                    return (item.productId.price * item.quantity) 
                } 
            })
            console.log(subtota)
            return Object.assign({}, state, {
                saveforlaterlist: action.payload.saveForLater,
                saveforlaterRedirect: false  ,
                cartlist: action.payload.cart,
                cartsubtotal: subtota.toFixed(2),
                carttotalitems: _.sumBy(action.payload.cart, 'quantity'),
                cartRedirect: false  
            });
        
            case CUSTOMER_SAVEFORLATER:
                console.log(action.payload)
                return Object.assign({}, state, {
                    saveforlaterlist: action.payload,
                    cartRedirect: false  
                });

    case ADD_TO_CART_PRODUCT_DETAIL_PAGE:
        return {
            cartRedirect: true
        };

        case CUSTOMER_CART:
            console.log(action.payload)
            let subtotal = _.sumBy(action.payload, function (item) { 
                console.log(item)
                if (item.gift) 
                { 
                    console.log("a")

                    return (((item.productId.price * (105/100)).toFixed(2)) * item.quantity) 
                } 
                else { 
                    console.log("b")

                    return (item.productId.price * item.quantity) 
                } 
            })
            console.log("c")

            console.log(subtotal)
            return Object.assign({}, state, {
                cartlist: action.payload,
                cartsubtotal: subtotal.toFixed(2),
                carttotalitems: _.sumBy(action.payload, 'quantity'),
                cartRedirect: false  
            });
       
        default:
            return state;
    }
};
