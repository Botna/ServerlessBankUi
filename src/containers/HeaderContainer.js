import Header from "../components/common/header";
import {connect} from "react-redux";

function mapStateToProps(state){
    return {
        currentPage: state.headerReducer.data.currentPage,
        currentToken: state.headerReducer.data.currentToken
    }
}

export default connect(
    mapStateToProps)
(Header)