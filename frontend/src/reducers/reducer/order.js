import {
    GET_USER_ORDER,
    GET_USER_ORDER_ERR,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_STAT_ERR,
    CREATE_NEW_ORDER,
    CREATE_NEW_ORDER_ERR,
    ADMIN_GET_ALL_ORDERS,
    ADMIN_GET_ALL_ORDERS_ERR
} from '../../actions/types';

const initialState = {
    userOrders: [],
    // for getAllOrders
    paginationNext: null, //{page: null, limit: null},
    paginationPrev: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_USER_ORDER:
            return Object.assign({},
                state,
                { userOrders: payload }
            );

        case UPDATE_ORDER_STATUS:
            return Object.assign({},
                state,
                {
                    userOrders: state.userOrders.map(item => {
                        // if(payload.orderId === item.orderId && payload.productId === item.productId._id) {
                        if(payload._id === item._id) {
                            let updatedOrder = Object.assign({},
                                item, 
                                {
                                    status: payload.status,
                                    statusHistory: payload.statusHistory

                                });
                            return updatedOrder;
                        } else {
                            return item;
                        }
                    })
                }
            );
        
        case CREATE_NEW_ORDER:
            return state;

        case ADMIN_GET_ALL_ORDERS:
                return Object.assign({},
                    state,
                    {
                        userOrders: payload.results,
                        paginationNext: payload.next || null,
                        paginationPrev: payload.previous || null,
                    });

        case CREATE_NEW_ORDER_ERR:
        case UPDATE_ORDER_STAT_ERR:
            return state;

        case ADMIN_GET_ALL_ORDERS_ERR:
        case GET_USER_ORDER_ERR:
            return {
                ...state,
                userOrders: [],
                paginationNext: null,
                paginationPrev: null
            }

        default:
            return state;
    }
}
