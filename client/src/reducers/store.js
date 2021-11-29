import {
    FETCH_ALL_AVAILABLE_BLOOD_SUCCESS,
    FETCH_ALL_AVAILABLE_BLOOD_FAIL,
    SAVE_ADMIN_REQUEST_FAIL,
    SAVE_ADMIN_REQUEST_SUCCESS,
    FETCH_ALL_DONOR_DATA_FAIL,
    FETCH_ALL_DONOR_DATA_SUCCESS
} from '../actions/types';

const initialState = {
    loading: true,
    storeNewRequestLoading: true,
    availableBlood: [],
    donorData: [],
    donorLoading: true
}

function storeReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_ALL_DONOR_DATA_SUCCESS:
            return {
                ...state,
                donorLoading: false,
                donorData: action.payload.appointments
            }
        case FETCH_ALL_DONOR_DATA_FAIL:
            return {
                ...state,
                donorLoading: false
            }
        case FETCH_ALL_AVAILABLE_BLOOD_SUCCESS:
            return {
                ...state,
                loading: false,
                availableBlood: payload.store
            };
        case FETCH_ALL_AVAILABLE_BLOOD_FAIL:
            return {
                ...state,
                loading: false,
                availableBlood: payload.store
            }
        case SAVE_ADMIN_REQUEST_SUCCESS:
            return {
                ...state,
                storeNewRequestLoading: false,
            };
        case SAVE_ADMIN_REQUEST_FAIL:
            return {
                ...state,
                storeNewRequestLoading: false,
            }
        default:
            return state;
    }
}
export default storeReducer;
