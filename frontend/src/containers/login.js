import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleChange, handleLogin } from '../modules/auth';

const Login = (props) => {
    console.log(props);

    return (
    <form onSubmit={ props.handleLogin }>
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

        <button type="submit" disabled={ props.isAuthenticating }>Login</button>

        <Link to="/register">Register</Link>
    </form>
    )
};

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleLogin,
    handleChange,
    changePage: () => push('/login')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
