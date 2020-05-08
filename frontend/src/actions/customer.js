import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'

export const getCard = (customerId) => async (dispatch) => {

    await axios.get(`${API_ENDPOINT}/card/getCard/${customerId}`)
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_CARD',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const getAddress = (customerId) => async (dispatch) => {

    axios.defaults.withCredentials = true;
    await axios.get(`${API_ENDPOINT}/address/getAddress/${customerId}`, { config: { headers: { 'Content-Type': 'application/json' }} } )
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_ADDRESS',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const addCard = (body) => async (dispatch) => {

    await axios.post(`${API_ENDPOINT}/card/addCard`, body)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }
            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'ADD_CARD',
                payload: payload
            })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}

//done
export const addAddress = (body) => async (dispatch) => {

    await axios.post(`${API_ENDPOINT}/address/addAddress`, body)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'ADD_ADDRESS',
                payload: payload
            })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}



export const updateCard = (customerId, cardId, body) => async (dispatch) => {

    await axios.put(`${API_ENDPOINT}/card/updateCard/${customerId}/card/${cardId}`, body)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_CARD',
                payload: payload
            })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}



export const updateAddress = (customerId, addressId, body) => async (dispatch) => {
    console.log('customerId ------- -', addressId)
    // manually adding id
    await axios.put(`${API_ENDPOINT}/address/updateAddress/${customerId}/address/${addressId}`, body)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            // dispatch({
            //     type: 'UPDATE_PRODUCT',
            //     payload: payload
            // })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}

export const getAddressDetail = (userId, addressId) => async (dispatch) => {

    await axios.get(`${API_ENDPOINT}/address/${userId}/detail/${addressId}`)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'ADDRESS_DETAIL',
                payload: payload
            })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const removeAddress = (customerId, addressId) => async (dispatch) => {

    console.log('addressid -', addressId)
    // manually adding id
    await axios.delete(`${API_ENDPOINT}/address/deleteAddress/${customerId}/address/${addressId}`)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            console.log('update action - ', payload)

            dispatch({
                type:'FETCH_ADDRESS',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const deleteCard = (customerId, cardId) => async (dispatch) => {

    await axios.delete(`${API_ENDPOINT}/card/deleteCard/${customerId}/card/${cardId}`)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_CARD',
                payload: payload
            })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}



export const addReview = (productId , body) => async (dispatch) => {

    await axios.post(`${API_ENDPOINT}/product/review/${productId}`, body)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }
            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'ADD_REVIEW',
                payload: payload
            })
            console.log('update action - ', payload)
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const getCustomerProfile = (customerId) => async (dispatch) => {

    console.log('id - ', customerId)

    await axios.get(`${API_ENDPOINT}/customer/profile/${customerId}`)
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {

            console.log('fetch profile', payload)

            dispatch({
                type: 'FETCH_CUSTOMER_PROFILE',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const updateCustomerProfile = (body, userId) => async (dispatch) => {
    await axios.post(`${API_ENDPOINT}/customer/profileupdate/${userId}`, body, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'UPDATE_CUSTOMER_PROFILE',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })

    }
    
export const setDefaultAddress = (address) => async (dispatch) => {
    dispatch({
        type: 'DEFAULT_ADDRESS',
        payload: address
    })
}

export const setDefaultCard = (card) => async (dispatch) => {
    dispatch({
        type: 'DEFAULT_CARD',
        payload: card
    })
}