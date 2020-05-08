import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'
import {GET_CATEGORIES,ADD_CATEGORY, REMOVE_CATEGORY} from './types'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

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

export const getCategories = () => async dispatch => {

    try {
        const res = await axios.get(`/product/getcategories`);
        console.log(`/product/getcategories`, res);

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch (err) {
        console.log(`Error: /product/getcategories`, err);
        dispatch({
            type: GET_CATEGORIES,
            payload: {
                error: err.body
            }
        });
        // dispatch(setAlert(err.body.error, 'danger'));
    }
};


export const addCategory = (data) => async dispatch => {

    try {
        const res = await axios.put(`/product/addcategory`, data, config );
        console.log(`/product/addcategory`, res);

        dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        });
    } catch (err) {
        console.log(`Error: /product/addcategory`, err);
        dispatch({
            type: ADD_CATEGORY,
            payload: {
                error: err.body
            }
        });
        // dispatch(setAlert(err.body.error, 'danger'));
    }
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


export const fetchProduct = (searchText = '', filterText = '', offset = 1, sortType = '',ratingFilter=0, price=-1 ) => async (dispatch) => {

    if (offset === '') {
        offset = 1
    }

    await axios.get(
        `${API_ENDPOINT}/product/search`,
        {
            params: { searchText: searchText, offset: offset, filterText: filterText, sortType: sortType, ratingFilter: ratingFilter, price:price }
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




export const getSellerProductsPaginated = (searchText = '', filterText = '', offset = 1, sortType = '', userId) => async (dispatch) => {

    console.log('hitting seller product paginated')

    await axios.get(
        `${API_ENDPOINT}/product/getSellerPaginatedResult`,
        {
            params: { searchText: searchText, offset: offset, filterText: filterText, sortType: sortType, sellerId: userId }
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

export const deleteCategory = (data) => async dispatch => {

    try {
        const res = await axios.delete(`/product/deletecategory/${data}`);
        console.log(`/product/deletecategory`, res);

        // dispatch({
        //     type: REMOVE_CATEGORY,
        //     payload: res.data
        // });
    } catch (err) {
        console.log(`Error: /product/deletecategory`, err);
        // dispatch({
        //     type: ADD_CATEGORY,
        //     payload: {
        //         error: err.body
        //     }
        // });
        // dispatch(setAlert(err.body.error, 'danger'));
    }
};




export const updateProduct = (productId, body) => async (dispatch) => {

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



export const getReview = (productId) => async (dispatch) => {

    await axios.get(`${API_ENDPOINT}/product/review/${productId}`)
        .then(response => {

            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            dispatch({
                type: 'FETCH_REVIEW',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}


export const incrementView = (productId) => async (dispatch) => {

    await axios.post(`${API_ENDPOINT}/product/incrementview/${productId}`)
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


//todo this should ideally be in order action
export const setupOrderedProductForDetail = (orderedProduct) => async (dispatch) => {
    dispatch({
        type: 'SETUP_ORDER_DETAIL_PRODUCT',
        payload: orderedProduct
    })
}