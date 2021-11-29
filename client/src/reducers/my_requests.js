import {
    FETCH_ALL_MY_REQUESTS_FAIL,
    FETCH_ALL_MY_REQUESTS_SUCCESS,
    EDIT_MY_REQUEST_SUCCESS,
    EDIT_MY_REQUEST_FAIL
    } from '../actions/types';

    const initialState = {
        loading: true,
        myrequest_loading: true,
        myRequests: []
    }

    function myRequestReducer(state = initialState, action) {
        const { type, payload } = action;
        switch (type) {
            case FETCH_ALL_MY_REQUESTS_SUCCESS:
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
                return {
                    ...state,
                    myrequest_loading: false
                }
            default:
                return state;
        }
    }

    export default myRequestReducer;
