import {
    FETCH_ALL_MY_REQUESTS_FAIL,
    FETCH_ALL_MY_REQUESTS_SUCCESS,
    EDIT_MY_REQUEST_SUCCESS,
    EDIT_MY_REQUEST_FAIL
} from '../actions/types';

import { toast } from 'react-toastify';
const initialState = {
    loading: true,
    myrequest_loading: true,
    myRequests: []
}

function myRequestReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_ALL_MY_REQUESTS_SUCCESS:
            toast.success('Successfully Fetched REQUEST Data...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return {
                ...state,
                loading: false,
                myRequests: payload.myReqs
            }
        case FETCH_ALL_MY_REQUESTS_FAIL:
            return {
                ...state,
                loading: false
            }
        case EDIT_MY_REQUEST_FAIL:
            return {
                ...state,
                myrequest_loading: false
            }
        case EDIT_MY_REQUEST_SUCCESS:
            toast.success('Successfully Saved REQUEST Data...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return {
                ...state,
                myrequest_loading: false
            }
        default:
            return state;
    }
}

export default myRequestReducer;
