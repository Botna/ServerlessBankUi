import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Popup from "reactjs-popup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AccountSummary extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            currentToken: this.props.currentToken,
            currentBalance: this.props.currentBalance,
            transactionHistory: this.props.transactionHistory,
            depositAmount: '',
            withdrawlAmount: ''
        }
        this.successToast = this.successToast.bind(this);
        this.errorToast = this.errorToast.bind(this);

        this.makeDeposit = this.makeDeposit.bind(this);
        this.makeWithdrawl = this.makeWithdrawl.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentBalance !== this.props.currentBalance) {
            this.setState({ currentBalance: this.props.currentBalance });
        }
        if (JSON.stringify(prevProps.transactionHistory) !== JSON.stringify(this.props.transactionHistory)) {

          
            this.setState({ transactionHistory: this.props.transactionHistory });
        }
    }
    successToast(message) {
        toast.success(message);
    }

    errorToast(message) {
        toast.error(message);
    }
    componentWillReceiveProps(props) {
        if (props.reloadNeeded) {
            const { getBalance, getHistory } = this.props;
            getBalance(this.state);
            getHistory(this.state);
        }
        if (props.error) {
            this.errorToast(props.error.message);
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCurrency = name => event => {
        var newValue = event.target.value.replace(/^\$/g, "");
        var matches = newValue.match(/^\d*\.?\d{0,2}$/g)
        if (matches) {
            this.setState({
                [name]: newValue,
            });
        }
    }
    componentDidMount() {
        const { getBalance, getHistory } = this.props;
        getBalance(this.state);
        getHistory(this.state);
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    makeDeposit(closer) {
        closer()
        const { makeDeposit } = this.props;
        makeDeposit(this.state);
    }
    makeWithdrawl(closer) {
        closer()
        const { makeWithdrawl } = this.props;
        makeWithdrawl(this.state);
    }
    logout() {
        const { logout } = this.props;
        logout(this.state);
    }
    render() {
        const styles = {
            root: {
                width: '80%',
                overflowX: 'auto',
                margin: 'auto',
                marginTop: '50px'
            },
            textField: {
                margin: '0px 0px 0px 5px'
            },
            table: {
                minWidth: 700,
            },
            tableCell: {
                textAlign: 'left'
            },
            popup: {
                widht: '450px'
            }
        };


        return (<div>

            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
            />
            <Card className="balanceCard">
                <TextField
                    id="currentBalance"
                    style={styles.textField}
                    label="Current Balance"
                    value={'$' + this.state.currentBalance}
                    margin="normal"
                />
                <div>
                <Popup style={styles.popup} trigger={<Button id="makeDeposit" onClick={() => this.makeDeposit()}>Deposit</Button>} position="right center" modal>
                    {close => (
                        <div>
                            <div>
                            <TextField
                                id="depositAmount"
                                label="Amount to Deposit"
                                value={'$' + this.state.depositAmount}
                                onChange={this.handleCurrency('depositAmount')}
                                margin="normal"
                            />
                            </div>
                            <div>
                            <Button className="buttonRightJustify"  onClick={() => this.makeDeposit(close)}>Confirm</Button>
                            </div>
                        </div>
                    )}
                </Popup>

                <Popup trigger={<Button id="makeWithdrawl">Withdrawl</Button>} position="right center" modal>
                    {close => (
                        <div>
                            <div>
                            <TextField
                                id="withdrawlAmount"
                                label="Amount to Withdraw"
                                value={'$' + this.state.withdrawlAmount}
                                onChange={this.handleCurrency('withdrawlAmount')}
                                margin="normal"
                            />
                            </div>
                            <div>
                            <Button  className="buttonRightJustify" onClick={() => this.makeWithdrawl(close)}>Confirm</Button>
                            </div>
                        </div>
                    )}
                </Popup>
                <Button className="buttonRightJustify" id="logoutButton" onClick={() => this.logout()} >Logout</Button>
                </div>
            </Card>
            <Card className="transactionCard">
                <Table style={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date of Transaction</TableCell>
                            <TableCell>Withdrawl</TableCell>
                            <TableCell>Deposit</TableCell>
                            <TableCell>Previous Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.transactionHistory.map(row => {
                            return (
                                <TableRow key={row.timeOfTransaction}>
                                    <TableCell>{row.timeOfTransaction}</TableCell>
                                    <TableCell style={styles.tableCell} numeric>{row.typeOfTransaction === 'Withdrawl' ? row.amount : '-'}</TableCell>
                                    <TableCell style={styles.tableCell} numeric>{row.typeOfTransaction === 'Deposit' ? row.amount : '-'}</TableCell>
                                    <TableCell style={styles.tableCell} numeric>{row.startingAmount}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>)
    }


}
export default AccountSummary;