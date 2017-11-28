// based on https://thinkster.io/tutorials/react-redux-forms

import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleChange, handleRegister } from '../modules/auth';

const Register = (props) => (
    <form onSubmit={ props.handleRegister }>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            value={ props.email }
            onChange={ props.handleChange } />

        <label htmlFor="">Password</label>
        <input
            type="password"
            name="password"
            value={ props.password }
            onChange={ props.handleChange } />

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
