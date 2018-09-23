import React, { Component } from 'react';
import AccountSummary from '../../containers/AccountSummaryContainer';
import Login from '../../containers/LoginContainer';

class Header extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            currentPage: props.currentPage,
            currentToken: props.currentToken
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentPage != this.props.currentPage) {
            this.setState({ currentPage: this.props.currentPage })
        }
    }
    render() {
        return (<div>
            {this.state.currentPage === "LOGIN" && <Login />}
            {this.state.currentPage === "ACCOUNTSUMMARY" && <AccountSummary currentToken={this.props.currentToken} />}
        </div>)
    }


}
export default Header;