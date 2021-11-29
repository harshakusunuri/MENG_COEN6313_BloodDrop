// import api from '../utils/api';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
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
    ALL_APPOINTMENT_LOG_FAIL,
    APPOINTMENT_SLOTS_SUCCESS, APPOINTMENT_SLOTS_FAIL
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Register User
export const userRegister = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // const formData = {
        //     name, email, password, password2, address, bloodGroup, isOrg
        // }
        const body = JSON.stringify(formData);
        //console.log(body);
        const res = await axios.post('/api/users/userRegister', body, config);
        //console.log(res.data);
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        console.log(JSON.stringify(err));
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: USER_REGISTER_FAIL
        });
    }
};

// Login User
export const userLogin = (formData) => async (dispatch) => {
    // const body = { email, password, isOrg: false };
    // const body = JSON.stringify(formData);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify(formData);
        const res = await axios.post('/api/users/userLogin', body, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: USER_LOGIN_FAIL
        });
    }
};

// Logout
export const logout = () => ({ type: LOGOUT });

// export const logout = () => dispatch => { dispatch({ type: LOGOUT }); }



//Get All Appointments
export const getAppointmentsLog = () => async (dispatch) => {

    // if (localStorage.token) {
    //     setAuthToken(localStorage.token);
    // }
    // dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.post('/api/users/donor/getAppointmentslog');

        dispatch({
            type: ALL_APPOINTMENT_LOG_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(JSON.stringify(err));
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }


        dispatch({
            type: ALL_APPOINTMENT_LOG_FAIL,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// GET Appointment slots
export const getAppointmentslots = (location, donationDate, bloodGroup) => async (dispatch) => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        // const formData = { location, donationDate, bloodGroup };
        // const body = JSON.stringify(formData);

        const res = await axios.post('/api/users/donor/getAppointmentslots', location, donationDate, bloodGroup, config);


        dispatch({
            type: APPOINTMENT_SLOTS_SUCCESS,
            payload: res.data
        });


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: APPOINTMENT_SLOTS_FAIL
        });
    }
};