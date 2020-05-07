import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'


export const getSellerProfile = (sellerId) => async (dispatch) => {

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