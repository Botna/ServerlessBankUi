import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
class Login extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            userName: this.props.userName,
            password: this.props.password,
            success: this.props.success,
            error: this.props.error,
        }

        this.successToast = this.successToast.bind(this);
        this.errorToast = this.errorToast.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.login = this.login.bind(this);
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    componentWillReceiveProps(props) {
        if (props.success !== "") {
            this.successToast(props.success);
        }
        if (props.error !== "") {
            this.errorToast(props.error.message);
        }
    }
    successToast(message) {
        toast.success(message);
    }

    errorToast(message) {
        toast.error(message);
    }
    createNewUser = () => {
        const { registerUser } = this.props;
        registerUser(this.state);
    }
    login = () => {
        const { login } = this.props;
        login(this.state);
    }
    render() {

        return (<div >

            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
            />

            <Card className="login_paper">
                <CardContent>
                    <Typography color="textPrimary">
                        Welcome to the Best Bank Site
                    </Typography>
                    <div>
                        <TextField
                            className="textFieldOffset"
                            id="userNameTextField"
                            label="UserName"
                            value={this.state.userName}
                            onChange={this.handleChange('userName')}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            className="textFieldOffset"
                            id="passwordTextField"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin="normal"
                        />
                    </div>
                    <div className="buttonRightAlignment">
                        <Button id="createUserButton" onClick={() => this.createNewUser()}>Create New User</Button>
                        <Button id="loginButton" onClick={() => this.login()}>Login</Button>
                    </div>
                </CardContent>
            </Card>

        </div>)
    }


}

export default Login;