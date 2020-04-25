import axios from "axios";

export const productCategories=()=>async(dispatch)=>{
    console.log("inside  editCompanyInfo action");

    axios.defaults.withCredentials = true;
    await axios({
        method: 'get',
        url: 'http://localhost:3001/productCategories',
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
        }).catch(function (err) {
            console.log(err)
        });
};