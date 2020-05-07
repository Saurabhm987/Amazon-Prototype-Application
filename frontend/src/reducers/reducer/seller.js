import {
    FETCH_SELLER_PROFILE,
    UPDATE_SELLER_PROFILE,
} from '../../actions/types';

const initialState = {
    profileDetail: {},
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case FETCH_SELLER_PROFILE:
            return {
                ...state,
                profileDetail: payload
            };

        case UPDATE_SELLER_PROFILE:
            return {
                ...state,
                profileDetail: payload
            };

        default:
            return state;
    }
}
