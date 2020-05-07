// combine reducer
import { combineReducers } from 'redux';
import auth from './reducer/auth';
import alert from './reducer/alert';
import product from "./reducer/product";
import order from "./reducer/order";
import cart from "./reducer/cart";
import saveforlater from "./reducer/saveforlater";
import customer from './reducer/customer'
import seller from './reducer/seller'


export default combineReducers({
    auth: auth,
    alert: alert,
    product: product,
    order: order,
    cart:cart,
    saveforlater:saveforlater,
    customer: customer,
    seller: seller,
});
