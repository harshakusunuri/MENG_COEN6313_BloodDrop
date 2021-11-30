import { combineReducers } from "redux"
import alert from './alert'
import auth from './auth'
import store from './store';
import my_requests from './my_requests';
import userData from './userData'

export default combineReducers({

    alert, auth, store, my_requests
});