import {createStore, applyMiddleware, combineReducers, compose} from "redux"
import reducers from "../reducers/reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__ || compose;
export default initialState =>
createStore(
    combineReducers({...reducers}),
    initialState, 
    composeEnhancers(applyMiddleware(thunk))
)