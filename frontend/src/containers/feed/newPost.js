import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createPost, handleChange } from '../../modules/newPost';

const NewPost = (props) => (
    <form onSubmit={ props.createPost }>
        <label>Content:
            <textarea
                name="content"
                value={ props.content }
                onChange={ props.handleChange } />
        </label>

        <button type="submit" disabled={ props.isPosting }>Post</button>
    </form>
);

const mapStateToProps = state => ({
    ...state.newPost
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    createPost,
    handleChange,
    changePage: () => push('/new-post')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPost);
