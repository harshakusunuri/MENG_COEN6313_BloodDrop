import {

    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,


    ALL_APPOINTMENT_LOG_SUCCESS,
    ALL_APPOINTMENT_LOG_FAIL
} from "../actions/types";

import { toast } from 'react-toastify';
const initialState = {
    // token: localStorage.getItem('token'),
    // isAuthenticated: null,
    loading: true,
    appointmentsLog: []
}


function userDataReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ALL_APPOINTMENT_LOG_SUCCESS:
            toast.success('Successfully Fetched APPOINTMENT Data...', {
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
                // isAuthenticated: true,
                loading: false,
                appointmentsLog: payload.appointmentsLog
            };

        case ALL_APPOINTMENT_LOG_FAIL:
            toast.error('Failed to Fetch APPOINTMENT Data...', {
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
                // token: null,
                // isAuthenticated: false,
                loading: false,
                appointmentsLog: null
            };
        default:
            return state;
    }
}

export default userDataReducer;
