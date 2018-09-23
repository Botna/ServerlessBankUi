import { combineReducers } from "redux"
import dispatchTypes from "./dispatchTypes"
import initialState from "./initialState"

const data = (state = initialState.accountSummary, action) => {
    switch (action.type) {
        case dispatchTypes.LEDGER_REC_BALANCE_SUCCESS:
            return { ...state, currentBalance: action.response, error: "" , reloadNeeded: false}
        case dispatchTypes.LEDGER_REC_HISTORY_SUCCESS:
            return { ...state, transactionHistory: action.response, error: "", reloadNeeded: false }
        case dispatchTypes.LEDGER_REC_BALANCE_FAILURE:
        case dispatchTypes.LEDGER_REC_HISTORY_FAILURE:
        case dispatchTypes.LEDGER_REC_DEPOSIT_FAILURE:
        case dispatchTypes.LEDGER_REC_WITHDRAWL_FAILURE:
            return { ...state, error: action.error }
        case dispatchTypes.LEDGER_REC_DEPOSIT_SUCCESS:
        case dispatchTypes.LEDGER_REC_WITHDRAWL_SUCCESS:
            return { ...state, reloadNeeded: true, error: "" }
        default:
            return state
    }
}

export default combineReducers({
    data
});