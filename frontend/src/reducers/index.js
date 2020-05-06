// combine reducer
import { combineReducers } from 'redux';
import auth from './reducer/auth';
import alert from './reducer/alert';
import product from "./reducer/product";
import cart from "./reducer/cart";
import saveforlater from "./reducer/saveforlater";



export default combineReducers({
    auth: auth,
    alert: alert,
    product: product,
    cart:cart,
    saveforlater:saveforlater
});
