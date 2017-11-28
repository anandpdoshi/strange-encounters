import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const requireAuthentication = (Component) => {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth(isAuthenticated) {
            if(!isAuthenticated) {
                // TODO handle this using redux
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
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

    return connect(mapStateToProps, null)(AuthenticatedComponent);
};

export default requireAuthentication;
