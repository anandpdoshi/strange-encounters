import request from 'superagent';
import { push } from 'react-router-redux';

export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT_REQUESTED = 'auth/LOGOUT_REQUESTED';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';
export const UPDATE_AUTH_FIELD = 'auth/UPDATE_AUTH_FIELD';
export const REGISTRATION_REQUESTED = 'auth/REGISTRATION_REQUESTED';
export const REGISTRATION_SUCCESS = 'auth/REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'auth/REGISTRATION_FAILURE';

const initialState = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    token: '',
    isAuthenticating: false,
    isAuthenticated: false,
    status: '',
    statusText: ''
};

// this is the REDUCER for auth
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AUTH_FIELD:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };

        case LOGIN_REQUESTED:
        case LOGOUT_REQUESTED:
        case REGISTRATION_REQUESTED:
            return {
                ...state,
                isAuthenticating: true,
                status: '',
                statusText: ''
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticating: !state.isAuthenticating,
                isAuthenticated: true,
                password: ''
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticating: !state.isAuthenticating,
                isAuthenticated: false
            };

        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isAuthenticating: !state.isAuthenticating,
                isAuthenticated: false
            }

        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case REGISTRATION_FAILURE:
            return {
                ...state,
                isAuthenticating: !state.isAuthenticating,
                status: action.payload.status,
                statusText: action.payload.statusText
            };

        default:
            return state;
    }
};

// these are functions to dispatch actions
// aka action creators
// uses redux-thunk style
export const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    // console.log(key, value);

    return (dispatch) => {
        dispatch({
            type: UPDATE_AUTH_FIELD,
            payload: {
                key,
                value
            }
        });
    }
}

export const handleLogin = (event) => {
    event.preventDefault();
    return (dispatch, getState) => {
        dispatch({
            type: LOGIN_REQUESTED
        });

        const authState = getState().auth;
        console.log(authState);

        request
            .post('/api/auth/login')
            .send({
                email: authState.email,
                password: authState.password
            })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    console.error(err.text);
                } else if (res) {
                    // console.log(res);
                    if (res.body.status==='LOGIN_SUCCESS') {
                        dispatch({
                            type: LOGIN_SUCCESS
                        });
                        dispatch(push('/'));
                    } else {
                        dispatch({
                            type: LOGIN_FAILURE,
                            payload: {
                                status: res.body.status,
                                statusText: res.body.msg
                            }
                        });
                        alert(res.body.msg);
                    }
                }
            });

    };
};

export const handleLogout = (event) => {
    event.preventDefault();
    return (dispatch) => {
        dispatch({
            type: LOGOUT_REQUESTED
        });

        request
            .post('/api/auth/logout')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.error(err.text);
                } else if (res) {
                    // console.log(res);
                    if (res.body.status==='LOGOUT_SUCCESS') {
                        dispatch({
                            type: LOGOUT_SUCCESS
                        });
                        dispatch(push('/login'));
                    } else {
                        dispatch({
                            type: LOGOUT_FAILURE,
                            payload: {
                                status: res.body.status,
                                statusText: res.body.msg
                            }
                        });
                        alert(res.body.msg);
                    }
                }
            });
    }
};

export const handleRegister = (event) => {
    event.preventDefault();
    return (dispatch, getState) => {
        dispatch({
            type: REGISTRATION_REQUESTED
        });

        const authState = getState().auth;
        console.log(authState);

        request
            .post('/api/auth/register')
            .send({
                email: authState.email,
                password: authState.password,
                first_name: authState.first_name,
                last_name: authState.last_name
            })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.error(err.text);
                } else if (res) {
                    // console.log(res);
                    if (res.body.status==='REGISTRATION_SUCCESS') {
                        dispatch({
                            type: REGISTRATION_SUCCESS
                        });
                        dispatch(push('/'));
                    } else {
                        dispatch({
                            type: REGISTRATION_FAILURE,
                            payload: {
                                status: res.body.status,
                                statusText: res.body.msg
                            }
                        });
                        alert(res.body.msg);
                    }
                }
            });
    }
};
