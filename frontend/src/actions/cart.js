import {
    CUSTOMER_CART,ADD_TO_CART_PRODUCT_DETAIL_PAGE,CUSTOMER_SAVEFORLATER_DELETE
}from "./types";
import axios from "axios";
import {API_ENDPOINT} from '../components/controller/Endpoint'
const _ = require('lodash');



export const getCustomerCart = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${API_ENDPOINT}/user/getCart/${id}`)
        .then(response => {
            console.log(response.data)

            dispatch({
                type: CUSTOMER_CART,
                payload: response.data
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_CART,
                    payload: {}
                });
            }
        });
}

export const addToCart = (id,data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${API_ENDPOINT}/user/addToCart/${id}`, data)
        .then(response => {
            dispatch({
                type: ADD_TO_CART_PRODUCT_DETAIL_PAGE
            })
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_TO_CART_PRODUCT_DETAIL_PAGE
                });
            }
        });
}

export const updateCustomerCart = (data) => dispatch => {
    let payload={
        gift:data.gift,
        quantity:data.quantity,
        giftMessage:data.giftMessage
    }
    axios.defaults.withCredentials = true;
    axios.put(`${API_ENDPOINT}/user/updateCart/${data.customer_id}/product/${data.product_id}`,payload)
    .then(response => {
        console.log(response)
        dispatch({
        type: CUSTOMER_CART,
        payload: response.data
    })})
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_CART,
                payload: []
            });
        }
    });
}

export const deleteProductInCart = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.delete(`${API_ENDPOINT}/user/deleteCart/${data.customer_id}/product/${data.product_id}/${data.type}`)
    .then(response => {dispatch({
        type: CUSTOMER_SAVEFORLATER_DELETE,
        payload: response.data
    })})
    .catch(error => {
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_SAVEFORLATER_DELETE,
                payload: []
            });
        }
    });
}












///////////////////////////////////