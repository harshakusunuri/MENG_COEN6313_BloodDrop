import axios from 'axios';
import { setAlert } from './alert';

import {
   FETCH_ALL_MY_REQUESTS_FAIL,
   FETCH_ALL_MY_REQUESTS_SUCCESS,
   EDIT_MY_REQUEST_FAIL,
   EDIT_MY_REQUEST_SUCCESS
} from './types'

// GET My Requests
export const getMyRequests = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(data);
        const res = await axios.post('/api/users/donor/getMyRequestList', body, config);
        dispatch({
       type: FETCH_ALL_MY_REQUESTS_SUCCESS,
       payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FETCH_ALL_MY_REQUESTS_FAIL
        });
    }
};


// Edit My Requests
export const editMyRequest=(data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(data);
        const res = await axios.post('/api/users/donor/updateMyRequestList', body, config);
        dispatch({
       type: EDIT_MY_REQUEST_SUCCESS,
       payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: EDIT_MY_REQUEST_FAIL
        });
    }
};

