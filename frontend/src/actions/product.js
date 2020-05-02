import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'

export const productCategories = () => async (dispatch) => {
    console.log("inside  editCompanyInfo action");

    axios.defaults.withCredentials = true;
    await axios({
        method: 'get',
        url: `${API_ENDPOINT}/getcategories`,
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
    console.log('add product')

    await axios.post(`${API_ENDPOINT}/product/addproduct`, payload, { headers: {'Content-Type': 'multipart/form-data'}})
    //headers: {"Authorization" : `Bearer ${token}`}})
        .then(response => {
            if (response.status >= 500) {
                throw new Error('Bad response from server')
            }

            return response.data
        })
        .then(payload => {
            console.log('products payload : ', payload)
            dispatch({
                type: 'ADD_PRODUCT',
                payload: payload
            })
        })
        .catch(error => {
            console.log('error', error)
        })
}