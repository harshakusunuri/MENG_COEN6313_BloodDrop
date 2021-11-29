import { combineReducers } from "redux"
import alert from './alert'
import auth from './auth'

import userData from './userData'

export default combineReducers({

    alert, auth
});