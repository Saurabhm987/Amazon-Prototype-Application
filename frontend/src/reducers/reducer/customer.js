import {
    FETCH_CARD,
    FETCH_ADDRESS,
    ADD_CARD,
    ADD_ADDRESS,
    ADDRESS_DETAIL
} from '../../actions/types';

const initialState = {
    cardList: [],
    addressList: [],
    addressDetail:{}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case FETCH_CARD:
            return {
                ...state,
                cardList: payload
            };

        case FETCH_ADDRESS:
            return {
                ...state,
                addressList: payload
            };

        case ADD_CARD:
            return {
                ...state,
                cardList: [...state.cardList, payload]
            }

        case ADD_ADDRESS:
            return {
                ...state,
                addressList: [...state.addressList, payload]
            }

        case ADDRESS_DETAIL:
            return {
                ...state,
                addressDetail: payload
            }

        default:
            return state;
    }
}
