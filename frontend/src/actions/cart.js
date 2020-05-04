import {
    ADD_SAVEFORLATER, DELETE_SAVEFORLATER,FETCH_SAVEFORLATER,
    MOVE_TOCART,CUSTOMER_CART,CUSTOMER_CHECKOUT_DETAILS,
    CUSTOMER_CHECKOUT_SUBTOTAL, CUSTOMER_ORDER_SUMMARY,ADD_TO_CART_PRODUCT_DETAIL_PAGE
}from "./types";
import axios from "axios";
import {API_ENDPOINT} from '../components/controller/Endpoint'
const _ = require('lodash');

export const addSaveForLater = (id, data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(API_ENDPOINT)
    axios.post(`${API_ENDPOINT}/saveForLater/addToSaveForLater/${sessionStorage.getItem("id")}`, { productid: data })
        .then(response => {
            dispatch({ type: ADD_SAVEFORLATER, payload: response.data })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
export const deleteSaveForLater= (id,pid) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.delete(`${API_ENDPOINT}/saveForLater/deleteSaveForLater/${id}/product/${pid}/saveforlater`)
    .then(response => {      
            dispatch({type: DELETE_SAVEFORLATER,payload: response.data })    
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: DELETE_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
export const fetchSaveForLater = (id) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.get(`${API_ENDPOINT}/saveForLater/getSaveForLater/`+ id)
        .then(response => {console.log(response.data);dispatch({
            type:FETCH_SAVEFORLATER,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: FETCH_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
export const moveToCart = (id, pid) => dispatch => {

    axios.defaults.withCredentials = true;
    axios.delete(`${API_ENDPOINT}/saveForLater/deleteSaveForLater/${id}/product/${pid}/movetocart`)
        .then(response => {
            dispatch({type:MOVE_TOCART,payload: response.data })  
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: MOVE_TOCART,
                    payload: {}
                });
            }
         });
}
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

export const moveToCartFromProductPage = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${API_ENDPOINT}/user/addToCart/${sessionStorage.getItem("id")}/cart`, data.body)
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
    }
    axios.defaults.withCredentials = true;
    axios.put(`${API_ENDPOINT}/user/updateCart/${data.customer_id}/product/${data.product_id}`,payload)
    .then(response => {dispatch({
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

// export const getCustomerCheckoutDetails = (id) => dispatch => {
//     axios.defaults.withCredentials = true;
//     axios.get(`${API_ENDPOINT}/customer/${id}/checkout/`)
//     .then(response => {
//         dispatch(calculate_subtotal(response.data))
//         dispatch({
//         type: CUSTOMER_CHECKOUT_DETAILS,
//         payload: response.data
//     })})
//     .catch(error => {
//         if (error.response && error.response.data) {
//             return dispatch({
//                 type: CUSTOMER_CHECKOUT_DETAILS,
//                 payload: {}
//             });
//         }
//     });
// }

// export const calculate_subtotal=(checkoutdetails) => dispatch => {
//     let checkoutsubtotal = _.sumBy(checkoutdetails.cart, function (item) { if (item.gift){return ((item.product.discountedPrice*(110/100)) * item.quantity)}else{return (item.product.discountedPrice * item.quantity)} })
//     let checkouttotalitems = _.sumBy(checkoutdetails.cart, 'quantity')
//     dispatch({
//         type: CUSTOMER_CHECKOUT_SUBTOTAL,
//         payload: [(checkoutsubtotal.toFixed(2)),checkouttotalitems,checkoutdetails]
//     });
// }

// export const placeOrder = (payload) => dispatch => {
//     console.log(payload)
//     axios.defaults.withCredentials = true;
//     axios.post(`${API_ENDPOINT}/customer/${payload.customer_id}/orders`,payload)
//     .then(response => {
//         dispatch({
//         type: CUSTOMER_ORDER_SUMMARY,
//         payload: response.data
//     })})
//     .catch(error => {
//         if (error.response && error.response.data) {
//             return dispatch({
//                 type: CUSTOMER_CHECKOUT_DETAILS,
//                 payload: {}
//             });
//         }
//     });
// }
