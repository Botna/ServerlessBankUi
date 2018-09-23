
import { combineReducers } from "redux"
import dispatchTypes from "./dispatchTypes"
import initialState from "./initialState"
const data = (state = initialState.header, action) => {
    switch (action.type) {
        case dispatchTypes.LOGIN_REC_LOGIN_SUCCESS:
            return{...state, currentToken: action.response, currentPage: "ACCOUNTSUMMARY"}
        case dispatchTypes.LOGIN_REC_LOGOUT_SUCCESS:
            return {...state, currentToken: "", currentPage: "LOGIN"}
        default:
            return state
    }
}

export default combineReducers({
    data
});