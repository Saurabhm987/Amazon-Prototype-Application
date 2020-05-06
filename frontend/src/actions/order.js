import axios from "axios";
import { API_ENDPOINT } from '../components/controller/Endpoint'

export const getUserOrder = () => async (dispatch) => {
    console.log("inside  editCompanyInfo action");

    axios.defaults.withCredentials = true;
    await axios({
        method: 'get',
        url: `${API_ENDPOINT}/order/getUserOrder`,
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
            console.log('payload of orders: ', payload);
            console.log('payload: ', payload)
            // dispatch({
            //     type: "LOAD_CATEGORY",
            //     payload: payload
            // });
        }).catch((err) => {
            console.log(err)
        });
};