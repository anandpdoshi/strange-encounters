// based on https://thinkster.io/tutorials/react-redux-forms

import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleChange, handleRegister } from '../modules/auth';

const Register = (props) => (
    <form onSubmit={ props.handleRegister }>
        <label htmlFor="first_name">First Name</label>
        <input
            type="text"
            name="first_name"
            value={ props.first_name }
            onChange={ props.handleChange }
            required="required" />

        <label htmlFor="last_name">Last Name</label>
        <input
            type="text"
            name="last_name"
            value={ props.last_name }
            onChange={ props.handleChange } />

        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            value={ props.email }
            onChange={ props.handleChange }
            required="required" />

        <label htmlFor="password">Password</label>
        <input
            type="password"
            name="password"
            value={ props.password }
            onChange={ props.handleChange }
            required="required" />

        <button type="submit" disabled={ props.isAuthenticating }>Register</button>

        <br />
        <Link to="/login">Login</Link>
    </form>
);

const mapStateToProps = state => ({
    ...state.login
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleRegister,
    handleChange,
    changePage: () => push('/register')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
