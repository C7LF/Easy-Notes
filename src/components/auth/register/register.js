import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../state/authActions";
import classnames from "classnames";

import Layout from "../layout/layout"

import { TextField, Box, Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import "../main.scss"

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/notes");
        }
    }
    componentWillReceiveProps(nextProps) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
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
                            <h1 className="auth__intro--heading">Register</h1>
                            <p className="auth__intro--text">
                                Already have an account? <Link to="/auth/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="auth__input">
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    helperText={errors.name}
                                />
                            </div>
                            <div className="auth__input">
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    helperText={errors.email}
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
                                    helperText={errors.password}
                                />
                            </div>
                            <div className="auth__input">
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    helperText={errors.password2}
                                />
                            </div>
                            <div className="auth__actions">
                                <Button
                                    className="auth__actions--button"
                                    variant="contained" color="primary"
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </div>
                        </form>
                    </Box>
                </div>
            </Layout>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));