
import dispatchTypes from '../reducers/dispatchTypes'
import connection from '../config/connections'
export const actions = {

    getBalance: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Ledger/CurrentBalance?authToken=' + currentState.currentToken;

        fetch(url, {
            method: "get",
        }).then(response => {
            if (response.status !== 200) {
                throw new Error("Error during balance");
            }
            return response.json();

        }).then(response => {
            dispatch({ type: dispatchTypes.LEDGER_REC_BALANCE_SUCCESS, response: response });
        }).catch(e => {
            dispatch({ type: dispatchTypes.LEDGER_REC_BALANCE_FAILURE, error: e });
        })
    },
    makeDeposit: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Ledger/Deposit?authToken=' + currentState.currentToken;

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: currentState.depositAmount
        }).then(response => {
            if (response.status !== 200) {
                throw new Error("Error during deposit");
            }
            return response.json();

        }).then(response => {
            dispatch({ type: dispatchTypes.LEDGER_REC_DEPOSIT_SUCCESS, response: response });
        }).catch(e => {
            dispatch({ type: dispatchTypes.LEDGER_REC_DEPOSIT_FAILURE, error: e });
        })
    },
    makeWithdrawl: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Ledger/Withdrawl?authToken=' + currentState.currentToken;

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: currentState.withdrawlAmount
        }).then(response => {
            if (response.status !== 200) {
                throw new Error("Error during Withdrawl");
            }
            return response.json();
        }).then(response => {
            dispatch({ type: dispatchTypes.LEDGER_REC_WITHDRAWL_SUCCESS, response: response });
        }).catch(e => {
            debugger;
            dispatch({ type: dispatchTypes.LEDGER_REC_WITHDRAWL_FAILURE, error: e });
        })
    },
    getHistory: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Transaction/History?authToken=' + currentState.currentToken;

        fetch(url, {
            method: "get",
        }).then(response => {
            if (response.status !== 200) {
                throw new Error("Error during history");
            }
            return response.json();

        }).then(response => {

            var newResponse = JSON.parse(JSON.stringify(response));
            newResponse.forEach(function (element){
                var newDate = new Date(element.timeOfTransaction);
                element.timeOfTransaction = newDate.toString();
            })
            dispatch({ type: dispatchTypes.LEDGER_REC_HISTORY_SUCCESS, response: newResponse });
        }).catch(e => {
            dispatch({ type: dispatchTypes.LEDGER_REC_HISTORY_FAILURE, error: e });
        })
    },
    logout: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Account/Logout?authToken=' + currentState.currentToken;

        fetch(url, {
            method: "post",
        }).then(response => {
            if (response.status !== 200) {
                throw new Error("Error during history");
            }
            dispatch({ type: dispatchTypes.LOGIN_REC_LOGOUT_SUCCESS, response: response });
        }).catch(e => {
            dispatch({ type: dispatchTypes.LOGIN_REC_LOGOUT_FAILURE, error: e });
        })
    }

}
