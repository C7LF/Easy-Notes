import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../state/authActions";
import classnames from "classnames";
import Layout from "../layout/layout"

import "../main.scss"

import { TextField, Box, Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/notes");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/notes"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.state;
        return (
            <Layout>
                <div className="auth">
                    <Box className="auth__box" p={5} boxShadow={1}>
                        <Link to="/" className="auth__back">
                            <KeyboardBackspaceIcon /> &nbsp; <span>Back</span>
                        </Link>
                        <div className="auth__intro">
                            <h1 className="auth__intro--heading">Login</h1>
                            <p className="auth__intro--text">
                                Don't have an account? <Link to="/auth/register">Register here</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="auth__input">
                                <TextField
                                    fullWidth
                                    label="Email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    helperText={errors.email || errors.emailnotfound}
                                />
                            </div>
                            <div className="auth__input">
                                <TextField
                                    fullWidth
                                    label="Password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    helperText={errors.password || errors.passwordincorrect}
                                />
                            </div>
                            <div className="auth__actions">
                                <Button
                                    className="auth__actions--button"
                                    variant="contained" color="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>

                                <Link to="/auth/register" className="auth__back">
                                    <Button
                                        className="auth__actions--button"
                                        variant="outlined" color="default"
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </Box>
                </div>
            </Layout>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);