import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// default timeout == 5 seconds. set timeout = -1 for no timeout
export const setAlert = (msg, alertType, timeout=5000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    if (timeout !== -1) 
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload:id}), timeout);
}; 
