import request from 'superagent';
import { push } from 'react-router-redux';
import { submitForm, createHandleChange } from '../utils';

export const UPDATE_NEW_POST_FIELD = 'newPost/UPDATE_NEW_POST_FIELD';
export const NEW_POST_REQUEST = 'newPost/NEW_POST_REQUEST';
export const NEW_POST_SUCCESS = 'newPost/NEW_POST_SUCCESS';
export const NEW_POST_FAILURE = 'newPost/NEW_POST_FAILURE';

const initialState = {
    content: '',
    isPosting: false
};

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_FIELD:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };

        case NEW_POST_REQUEST:
            return {
                ...state,
                isPosting: true
            }

        case NEW_POST_SUCCESS:
            return {
                ...state,
                isPosting: false,
                content: ''
            }

        case NEW_POST_SUCCESS:
            return {
                ...state,
                isPosting: false
            }

        default:
            return state;
    }
};

export const handleChange = createHandleChange(UPDATE_NEW_POST_FIELD);

export const createPost = (event) => {
    event.preventDefault();

    return (dispatch, getState) => {
        dispatch({
            type: NEW_POST_REQUEST
        });

        const newPostState = getState().newPost;
        console.log(newPostState);

        submitForm({
            endpoint: '/api/post/new',
            data: {
                content: newPostState.content
            },
            callback: (res) => {
                console.log(res);
            }
        });
    }
};
