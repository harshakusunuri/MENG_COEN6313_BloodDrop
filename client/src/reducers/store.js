import {
    FETCH_ALL_AVAILABLE_BLOOD_SUCCESS,
    FETCH_ALL_AVAILABLE_BLOOD_FAIL,
    SAVE_ADMIN_REQUEST_FAIL,
    SAVE_ADMIN_REQUEST_SUCCESS,
    FETCH_ALL_DONOR_DATA_FAIL,
    FETCH_ALL_DONOR_DATA_SUCCESS
} from '../actions/types';


import { toast } from 'react-toastify';


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
            toast.success('Successfully Fetched DONOR Data...', {
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
                donorLoading: false,
                donorData: action.payload.appointments
            }
        case FETCH_ALL_DONOR_DATA_FAIL:
            toast.error('Failed to Fetch DONOR Data...', {
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
                donorLoading: false
            }
        case FETCH_ALL_AVAILABLE_BLOOD_SUCCESS:
            toast.success('Successfully Fetched STORE Data...', {
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
                availableBlood: payload.store
            };
        case FETCH_ALL_AVAILABLE_BLOOD_FAIL:
            toast.error('Failed to Fetch STORE Data...', {
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
                availableBlood: payload.store
            }
        case SAVE_ADMIN_REQUEST_SUCCESS:
            toast.success('Successfully SAVED  Dialog box Data...', {
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
                storeNewRequestLoading: false,
            };
        case SAVE_ADMIN_REQUEST_FAIL:
            toast.error('Failed to SAVE Dialog box Data...', {
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
                storeNewRequestLoading: false,
            }
        default:
            return state;
    }
}
export default storeReducer;
