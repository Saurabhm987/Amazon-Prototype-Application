// reducer holding authentication and user session data
import {
    LOAD_CATEGORY
} from '../../actions/types';

const initialState = {
    categoryList: [],
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOAD_CATEGORY:
            return {
                ...state,
                categoryList: payload
            };

        default:
            return state;
    }
}