import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint';
import { setAlert } from './alert';
import { 
    GET_USER_ORDER,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_STAT_ERR,
    GET_USER_ORDER_ERR 
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
axios.defaults.withCredentials = true;


export const getUserOrder = () => async dispatch => {

    try {
        const res = await axios.get(`/order/getUserOrder`);
        console.log(`/order/getUserOrder`, res);

        dispatch({
            type: GET_USER_ORDER,
            payload: res.data
        });
    } catch (err) {
        console.log(`Error: /order/getUserOrder`, err);
        dispatch({
            type: GET_USER_ORDER_ERR,
            payload: {
                error: err.body
            }
        });
        // dispatch(setAlert(err.body.error, 'danger'));
    }
};


export const updateStatus = (orderId, productId, updatedStatus) => async dispatch => {
    const data = {
        orderId,
        productId,
        updatedStatus
    };

    try {
        console.log('POST /order/updateStatus with data: ', data);
        const res = await axios.post(`/order/updateStatus`, data, config );
        console.log(`/order/getUserOrder`, res);

        dispatch({
            type: UPDATE_ORDER_STATUS,
            payload: res.data
        });
    } catch (err) {
        console.log(`Error: /order/getUserOrder`, err);
        dispatch({
            type: UPDATE_ORDER_STAT_ERR,
            payload: {
                error: err.body
            }
        });
        dispatch(setAlert(err.body.error, 'danger'));
    }
};