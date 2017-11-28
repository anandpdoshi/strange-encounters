import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Feed = (props) => (
    <div></div>
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changePage: () => push('/feed')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
