// import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import { setAlert } from './alert';
// import {

//     USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     USER_LOADED,
//     AUTH_ERROR,
//     USER_LOGIN_FAIL,
//     USER_LOGIN_SUCCESS,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT,


//     ALL_APPOINTMENT_LOG_SUCCESS,
//     ALL_APPOINTMENT_LOG_FAIL
// } from './types';

// //Get All Appointments
// export const getAppointmentsLog = () => async (dispatch) => {

//     // if (localStorage.token) {
//     //     setAuthToken(localStorage.token);
//     // }
//     // dispatch({ type: CLEAR_PROFILE });

//     try {
//         const res = await axios.post('/api/users/donor/getAppointmentslog');

//         dispatch({
//             type: ALL_APPOINTMENT_LOG_SUCCESS,
//             payload: res.data
//         });
//     } catch (err) {
//         console.log(JSON.stringify(err));
//         const errors = err.response.data.errors;

//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//         }


//         dispatch({
//             type: ALL_APPOINTMENT_LOG_FAIL,
//             // payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };
