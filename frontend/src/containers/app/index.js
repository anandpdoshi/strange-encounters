import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from '../home';
import About from '../about';
import Login from '../login';
import Register from '../register';
import Feed from '../feed';
import NewPost from '../feed/newPost';
import requireAuthentication from '../../modules/authCheck';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleLogout } from '../../modules/auth';

const App = (props) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/" onClick={ props.handleLogout }>Logout</Link>
            <Link to="/about-us">About</Link>
            <Link to="/new-post">New Post</Link>
        </header>

        <main>
            <Route exact path="/" component={ Home } />
            <Route exact path="/new-post" component={ requireAuthentication(NewPost) } />
            <Route exact path="/feed" component={ requireAuthentication(Feed) } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/about-us" component={ About } />
        </main>
    </div>
);

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleLogout,
}, dispatch);

export default withRouter(connect(
    null,
    mapDispatchToProps
)(App));
