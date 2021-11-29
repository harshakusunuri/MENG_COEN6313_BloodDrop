import axios from 'axios';
import { setAlert } from './alert';

import {
FETCH_ALL_AVAILABLE_BLOOD_FAIL,
FETCH_ALL_AVAILABLE_BLOOD_SUCCESS,
SAVE_ADMIN_REQUEST_FAIL,
SAVE_ADMIN_REQUEST_SUCCESS,
FETCH_ALL_DONOR_DATA_FAIL,
FETCH_ALL_DONOR_DATA_SUCCESS
} from './types'

// GET Available Blood data from Store
export const getAvailableBloodData = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(data);
        const res = await axios.post('/api/users/store/getAvailableBloodDetails', body, config);
        dispatch({
       type: FETCH_ALL_AVAILABLE_BLOOD_SUCCESS,
       payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FETCH_ALL_AVAILABLE_BLOOD_FAIL
        });
    }
};


// Save New Request for Blood data from Admin/Store
export const saveAdminRequest = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(data);
        console.log(body)
        const res = await axios.post('/api/users/store/updateMyRequest', body, config);
        dispatch({
       type: SAVE_ADMIN_REQUEST_SUCCESS,
       payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: SAVE_ADMIN_REQUEST_FAIL
        });
    }
};


// Save New Request for Blood data from Admin/Store
export const fetchDonarData = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(data);
        const res = await axios.post('/api/users/store/getAllDonorLog', body, config);
        dispatch({
       type: FETCH_ALL_DONOR_DATA_SUCCESS,
       payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: FETCH_ALL_DONOR_DATA_FAIL
        });
    }
};