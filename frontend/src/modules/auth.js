import request from 'superagent';

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

export const handleLogin = () => {

}

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
            .send({ email: authState.email, password: authState.password })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) console.error(err.text);
                if (res) console.log(res.text);
            });
    }
};

// export const increment = () => {
//     return dispatch => {
//         dispatch({
//             type: INCREMENT_REQUESTED
//         });
//
//         dispatch({
//             type: INCREMENT
//         });
//     };
// };
//
// export const incrementAsync = () => {
//     return dispatch => {
//         dispatch({
//             type: INCREMENT_REQUESTED
//         });
//
//         return setTimeout(() => {
//             dispatch({
//                 type: INCREMENT
//             });
//         }, 3000);
//     };
// };
//
// export const decrement = () => {
//     return dispatch => {
//         dispatch({
//             type: DECREMENT_REQUESTED
//         });
//
//         dispatch({
//             type: DECREMENT
//         });
//     };
// };
//
// export const decrementAsync = () => {
//     return dispatch => {
//         dispatch({
//             type: DECREMENT_REQUESTED
//         });
//
//         return setTimeout(() => {
//             dispatch({
//                 type: DECREMENT
//             });
//         }, 3000);
//     };
// };
