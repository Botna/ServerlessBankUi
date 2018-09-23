import AccountSummary from "../components/AccountSummary";
import {connect} from "react-redux";
import {actions} from "../actions/accountSummaryActions";

function mapStateToProps(state){
    return {
        currentBalance: state.accountSummaryReducer.data.currentBalance,
        transactionHistory: state.accountSummaryReducer.data.transactionHistory,
        reloadNeeded: state.accountSummaryReducer.data.reloadNeeded,
        error: state.accountSummaryReducer.data.error
    }
}

export default connect(
    mapStateToProps,
    actions)
(AccountSummary)