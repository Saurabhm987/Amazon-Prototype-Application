import {
    LOAD_CATEGORY,
    ADD_PRODUCT,
    FETCH_PRODUCT,
    PRODUCT_DETAIL,
    FETCH_REVIEW,
    SETUP_ORDER_DETAIL_PRODUCT,
    GET_CATEGORIES,
    ADD_CATEGORY,
    REMOVE_CATEGORY
} from '../../actions/types';

const initialState = {
    categoryList: [],
    productList: [],
    reviews: [],
    productDetail: {},
    productCount: 0,
    productListPerOrder:
        {
            "_id": "5ea7c94794935719fdc926b6",
            "buyerId": "5ea27851c464a507b34a86ea",
            "buyerName":"Shubham",
            "sellerId": "5e9e769c53ba4429d4835ade",
            "productId": "5ea29a3a5de6843370680c17",
            "productName":"3M 2364 Performance Masking Tape - 0.50 in. x 180 ft. Tan, Rubber Adhesive, Crepe Paper Backing Painters Tape Roll",
            "sellerName":"Cloudtail LLC.",
            "deliveryAddress": {
                "_id": "5ea7c94794935719fdc926b7",
                "street1": "33S 3rd St",
                "street2": "",
                "city": "San Jose",
                "state": "CA",
                "country": "USA",
                "pincode": 95113,
                "phone": "123456789"
            },
            "paymentDetails": "card ending with ***4444",
            "billingAddress": {
                "_id": "5ea7c94794935719fdc926b8",
                "name": "jon Doe",
                "street1": "33S 3rd St",
                "street2": "",
                "city": "San Jose",
                "state": "CA",
                "country": "USA",
                "pincode": 95113,
                "phone": "123456789"
            },
            "totalAmount": 60,
            "quantity": 1,
            "orderId": "5ea7c94794935719fdc926b5",
            "status": {
                "_id": "5ea7c94794935719fdc926b9",
                "updatedAt": "2020-04-28T06:12:23.794Z",
                "timestamps": "2020-05-05T20:56:50.522Z",
                "status": "Ordered",
                "location": ""
            },
            "statusHistory": [
                {
                    "updatedAt": "2020-04-28T06:12:23.794Z",
                    "timestamps": "2020-05-05T20:56:50.525Z",
                    "_id": "5ea7c94794935719fdc926ba",
                    "status": "Ordered",
                    "location": "San Jose"
                },
                {
                    "updatedAt": "2020-04-28T06:12:23.794Z",
                    "timestamps": "2020-05-05T20:56:50.525Z",
                    "_id": "5ea7c94794935719fdc926ba",
                    "status": "Ordered",
                    "location": "San Francisco"
                },
                {
                    "updatedAt": "2020-04-28T06:12:23.794Z",
                    "timestamps": "2020-05-05T20:56:50.525Z",
                    "_id": "5ea7c94794935719fdc926ba",
                    "status": "Ordered",
                    "location": "Ottawa"
                }
            ],
            "orderDate": "2020-04-28T06:12:23.810Z",
            "__v": 0
        },
    categoriesList: [],

};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_CATEGORY:
            return {
                ...state,
                categoryList: payload
            };

        case ADD_PRODUCT:
            return {
                ...state,
                productList: payload
            }

        case FETCH_PRODUCT:
            return {
                ...state,
                productList: payload.Products,
                productCount: payload.Count,
            }

        case PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: payload
            }

        case FETCH_REVIEW:
            return {
                ...state,
                reviews: payload
            }


        case SETUP_ORDER_DETAIL_PRODUCT:
            return {
                ...state,
                productListPerOrder: payload
            }

        case GET_CATEGORIES:
            return {
                ...state,
                categoriesList: payload
            }

        case ADD_CATEGORY:
            return {
                ...state,
                categoriesList: [...state.categoriesList,payload]
            }


        default:
            return state;
    }
}
