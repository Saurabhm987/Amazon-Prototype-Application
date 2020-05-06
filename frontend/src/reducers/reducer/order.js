import {
    GET_USER_ORDER,
    GET_USER_ORDER_ERR,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_STAT_ERR
} from '../../actions/types';

const initialState = {
    userOrders: []
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
                        if(payload.orderId === item.orderId) {
                            return payload;
                        } else {
                            return item;
                        }
                    })
                }
            );

        case UPDATE_ORDER_STAT_ERR:
            return state;

        case GET_USER_ORDER_ERR:
            return {
                ...state,
                userOrders: []
            }

        default:
            return state;
    }
}
