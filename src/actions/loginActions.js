
import dispatchTypes from '../reducers/dispatchTypes'
import connection from '../config/connections'
export const actions = {

    registerUser: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Account/CreateAccount'

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: currentState.userName,
                password: currentState.password
            }
           )
        }).then(response => {
            if(response.status !== 201) 
            {
                throw new Error("Invalid Username/password or Username already exists");

            }
            dispatch({type: dispatchTypes.LOGIN_REC_CREATE_SUCCESS, response: "Created Account Succesfully"});
        }).catch(e => {
            dispatch({type: dispatchTypes.LOGIN_REC_CREATE_FAILURE, error: e});
           
        })
    },
    login: (currentState) => (dispatch) => {
        const url = connection.baseURI + '/Account/Login'

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: currentState.userName,
                password: currentState.password
            }
           )
        }).then(response => {
            if(response.status !== 201) 
            {
                throw new Error("Username and/or password was incorrect");

            }
            return response.json();
           
        }).then(response => {

            dispatch({type: dispatchTypes.LOGIN_REC_LOGIN_SUCCESS, response: response});
        })
        .catch(e => {
            dispatch({type: dispatchTypes.LOGIN_REC_LOGIN_FAILURE, error: e});
           
        })
    }

}
