
import { combineReducers } from "redux"
import dispatchTypes from "./dispatchTypes"
import initialState from "./initialState"
const data = (state = initialState.login, action) => {
    switch (action.type) {
        case dispatchTypes.LOGIN_REC_CREATE_SUCCESS:
            return {...state, success: action.response, error: ""}
        case dispatchTypes.LOGIN_REC_CREATE_FAILURE:
            return {...state, success: "", error: action.error}
        case dispatchTypes.LOGIN_REC_LOGIN_FAILURE_SUCCESS:
            return{...state, token: action.response}
        case dispatchTypes.LOGIN_REC_LOGIN_FAILURE:
            return {...state, success: "", error: action.error}
        default:
            return state
    }
}

export default combineReducers({
    data
});