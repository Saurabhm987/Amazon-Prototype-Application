import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'

export const productCategories = () => async (dispatch) => {
    console.log("hitting get categoreis");

    axios.defaults.withCredentials = true;
    await axios({
        method: 'get',
        url: `${API_ENDPOINT}/product/getcategories`,
        config: { headers: { 'Content-Type': 'application/json' } },
        //headers: {"Authorization" : `Bearer ${token}`}
    })
        .then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((payload) => {
            console.log('payload of getcategories: ', payload);

            dispatch({
                type: "LOAD_CATEGORY",
                payload: payload
            });
        }).catch((err) => {
            console.log(err)
        });
};


export const addProduct = (payload) => async (dispatch) => {
    await axios.post(`${API_ENDPOINT}/product/addproduct`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'ADD_PRODUCT',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const fetchProduct = (searchText = '', filterText='', offset=1, sortType) => async (dispatch) => {

    await axios.get(
        `${API_ENDPOINT}/product/search`,
        {
            params: { searchText: searchText, offset: offset, filterText: filterText, sortType: sortType }
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_PRODUCT',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const getproductDetail = (productId) => async (dispatch) => {

    await axios.get(`${API_ENDPOINT}/product/${productId}`)
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'PRODUCT_DETAIL',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const getSellerProducts = (sellerId) => async (dispatch) => {

    await axios.get(`${API_ENDPOINT}/product/sellerproduct/${sellerId}`)
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_PRODUCT',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}




export const getSellerProductsPaginated = (searchText = '', filterText='', offset=1, sortType='', userId) => async (dispatch) => {

    console.log('hitting seller product paginated')

    await axios.get(
        `${API_ENDPOINT}/product/getSellerPaginatedResult`,
        {
            params: { searchText: searchText, offset: offset, filterText: filterText, sortType: sortType, sellerId:userId }
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_PRODUCT',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}






export const updateProduct = (productId, body ) => async (dispatch) => {

    await axios.put(`${API_ENDPOINT}/product/updateproduct/${productId}`, body)
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

export const deleteProduct = (productId) => async (dispatch) => {

    await axios.put(`${API_ENDPOINT}/product/deleteproduct/${productId}`)
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            return payload
        })
        .catch(error => {
            return error
        })
}

//todo this should ideally be in order action
export const setupOrderedProductForDetail = (orderedProduct) => async (dispatch) => {
    dispatch({
        type: 'SETUP_ORDER_DETAIL_PRODUCT',
        payload: orderedProduct
    })
}