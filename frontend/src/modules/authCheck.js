import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuth } from './auth';

const requireAuthentication = (Component) => {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.props.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.props.checkAuth();
        }

        render() {
            return (
                <div>
                { this.props.isAuthenticated === true
                    ? <Component {...this.props} />
                    : null
                }
                </div>
            );
        }

    };

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        email: state.auth.email,
        isAuthenticated: state.auth.isAuthenticated
    });

    const mapDispatchToProps = (dispatch) => bindActionCreators({
        checkAuth,
    }, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};

export default requireAuthentication;
