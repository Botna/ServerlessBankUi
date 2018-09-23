import Login from "../components/Login";
import {connect} from "react-redux";
import {actions} from "../actions/loginActions";

function mapStateToProps(state){
    return {
        userName: state.loginReducer.data.userName,
        password: state.loginReducer.data.password,
        success: state.loginReducer.data.success,
        error: state.loginReducer.data.error,

    }
}

export default connect(
    mapStateToProps,
    actions)
(Login)