import {
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOADED, AUTH_ERROR, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, LOGOUT, ALL_APPOINTMENT_LOG_SUCCESS,
    ALL_APPOINTMENT_LOG_FAIL, APPOINTMENT_SLOTS_SUCCESS, APPOINTMENT_SLOTS_FAIL
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    appointmentsLog: null,
    appointmentslots: null

}

function authReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case ALL_APPOINTMENT_LOG_SUCCESS:
            return {
                ...state,
                // isAuthenticated: true,
                loading: false,
                appointmentsLog: payload.appointmentsLog
            };
        case APPOINTMENT_SLOTS_SUCCESS:
            return {
                ...state,
                // isAuthenticated: true,
                loading: false,
                appointmentslots: payload
            };
        case APPOINTMENT_SLOTS_FAIL:
            return {
                ...state,
                // isAuthenticated: true,
                loading: false,
                appointmentslots: null
            };


        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return { ...state, ...payload, isAuthenticated: true, loading: false }

        case USER_REGISTER_FAIL: localStorage.removeItem('token');
            return { ...state, ...payload, isAuthenticated: false, loading: false }
        case AUTH_ERROR:
        case USER_LOGIN_FAIL:
        case LOGOUT:
        case ALL_APPOINTMENT_LOG_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                appointmentsLog: null
            };

        default:
            return state;
    }
}


export default authReducer;


// import {
//     USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
//     REGISTER_SUCCESS,
//     //REGISTER_FAIL,
//     USER_LOADED,
//     AUTH_ERROR,
//     LOGIN_SUCCESS,
//     //LOGIN_FAIL,
//     LOGOUT,
//     ACCOUNT_DELETED
// } from '../actions/types';

// const initialState = {
//     token: localStorage.getItem('token'),
//     isAuthenticated: null,
//     loading: true,
//     user: null
// };

// function authReducer(state = initialState, action) {
//     const { type, payload } = action;

//     switch (type) {
//         case USER_LOADED:
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 loading: false,
//                 user: payload
//             };
//         case USER_REGISTER_SUCCESS:
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 ...payload,
//                 isAuthenticated: true,
//                 loading: false
//             };
//         case ACCOUNT_DELETED:
//         case AUTH_ERROR:
//         case LOGOUT:
//             return {
//                 ...state,
//                 token: null,
//                 isAuthenticated: false,
//                 loading: false,
//                 user: null
//             };
//         default:
//             return state;
//     }
// }

// export default authReducer;