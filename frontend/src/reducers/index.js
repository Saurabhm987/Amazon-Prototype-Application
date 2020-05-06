// combine reducer
import { combineReducers } from 'redux';
import auth from './reducer/auth';
import alert from './reducer/alert';
import product from "./reducer/product";
import order from "./reducer/order";

export default combineReducers({
    auth: auth,
    alert: alert,
    product: product,
    order: order
});
