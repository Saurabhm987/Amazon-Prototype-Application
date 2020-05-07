import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'

export const getSellerProfile = (sellerId) => async (dispatch) => {

    await axios.get(`${API_ENDPOINT}/seller/profile/${sellerId}`)
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {

            console.log('fetch profile payload', payload)

            dispatch({
                type: 'FETCH_SELLER_PROFILE',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const updateSellerProfile = (body, userId) => async (dispatch) => {
    await axios.post(`${API_ENDPOINT}/seller/profileupdate/${userId}`, body, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'UPDATE_SELLER_PROFILE',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}