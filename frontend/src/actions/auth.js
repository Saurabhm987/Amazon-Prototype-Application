import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS
} from './types';

import { USER_ADMIN, USER_CUSTOMER, USER_SELLER } from '../components/controller/config';

export async function setAuthTokenToHeaders(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `jwt ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
};

// LOAD user and check auth using saved token
// used in main app component to check every time it is rendered
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthTokenToHeaders(localStorage.token);
    } 
    try {
        const res = await axios.get('/signin');
        // ..user is authenticated, dispatch USER_LOADED action with user data
        console.log('GET /login', res);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {   // user auth failed
        console.log('action loadUser failed');
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// login user to get token
export const loginUser = (email, password) => async dispatch => {
    const loginRoute = '/signin';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(loginRoute, body, config);
        let token = res.data.token;
        console.log('got token: ', token);
        let user = jwtDecode(token);
        console.log('decoded token: ', user);
        console.log('Login success: dispatching payload: ', { token, user });
        setAuthTokenToHeaders(token);
        //login success
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { token, user }
        });
        // console.log('call loadUser: ');
        // dispatch(loadUser());
    } catch (err) {
        console.log(`/POST ${loginRoute} error:`);
        // const error_msg = err.response.data;
        // const status = err.response.status;
        console.log('actions/auth/loginUser', err);
        dispatch(setAlert('Invalid username or password', 'danger'));
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Register new user, and set redux user state if success
export const registerUser = (userFormData, userType) => async dispatch => {
    try {
        var registerRoute = '/signUp';
        if (userType === USER_CUSTOMER)  {
            registerRoute += '/customer';
        } else if(userType === USER_SELLER) {
            registerRoute += '/seller';
        } else if(userType === USER_ADMIN) {
            registerRoute += '/admin';
        } else {
            throw 'action registerUser: userType route not available';
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify(userFormData);
    
        axios.defaults.withCredentials = true;
        const res = await axios.post(registerRoute, body, config);

        console.log('Register success: dispatching payload: ', res.data);
        //login success
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        console.log(`/POST ${registerRoute} error:`);
        console.log('actions/auth/registerUser', err);
        dispatch(setAlert(err.body.error, 'danger'));
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}