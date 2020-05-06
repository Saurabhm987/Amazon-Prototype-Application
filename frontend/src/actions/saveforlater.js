import {
    CUSTOMER_SAVEFORLATER,CUSTOMER_SAVEFORLATER_DELETE
    
}from "./types";
import axios from "axios";
import {API_ENDPOINT} from '../components/controller/Endpoint'
const _ = require('lodash');

export const addSaveForLater = (id, data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(API_ENDPOINT)
    axios.post(`${API_ENDPOINT}/saveForLater/addToSaveForLater/${sessionStorage.getItem("id")}`, { productid: data })
        .then(response => {
            dispatch({ type: CUSTOMER_SAVEFORLATER, payload: response.data })
        })

        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}

export const deleteSaveForLater = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.delete(`${API_ENDPOINT}/saveForLater/deleteSaveForLater/${data.customer_id}/product/${data.product_id}/${data.type}`)
    .then(response => 
        {console.log(response)
            dispatch({
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
export const fetchSaveForLater = (id) => dispatch => {
    console.log("in action")
    axios.defaults.withCredentials = true;
    axios.get(`${API_ENDPOINT}/saveForLater/getSaveForLater/`+ id)
        .then(response => {console.log(response.data);dispatch({
            type:CUSTOMER_SAVEFORLATER,
            payload: response.data
        })})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_SAVEFORLATER,
                    payload: {}
                });
            }
        });
}
